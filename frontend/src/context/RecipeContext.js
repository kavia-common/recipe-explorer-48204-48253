import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getRecipes, getRecipeById, isUsingMockData } from '../services/recipeService';

const RecipeContext = createContext(null);

/**
 * Shape of the recipe data used throughout the app.
 *
 * @typedef {Object} Recipe
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string[]} ingredients
 * @property {string} instructions
 * @property {number} cookTimeMinutes
 * @property {number} difficultyIndex
 * @property {string} difficultyLabel
 * @property {number} popularityScore
 */

/**
 * Determine if the given recipe matches a text query across title and ingredients.
 *
 * @param {Recipe} recipe - Recipe to evaluate.
 * @param {string} query - User-provided search query.
 * @returns {boolean} True if the recipe should be included.
 */
function recipeMatchesQuery(recipe, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const inTitle = recipe.title.toLowerCase().includes(q);
  const inIngredients = (recipe.ingredients || []).some((ingredient) =>
    String(ingredient).toLowerCase().includes(q)
  );
  return inTitle || inIngredients;
}

/**
 * PUBLIC_INTERFACE
 * Provider for recipes, filters, and configuration.
 *
 * This component automatically decides whether to use a mock data source or
 * an HTTP API based on the REACT_APP_API_BASE environment variable.
 */
export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);
      try {
        const data = await getRecipes();
        if (!cancelled) {
          setRecipes(data);
          setStatus('ready');
        }
      } catch (err) {
        // If the API-based implementation throws, surface an error but avoid crashing.
        if (!cancelled) {
          // In practice, getRecipes() should already fall back to mock data
          // when REACT_APP_API_BASE is not configured.
          // If it fails even then, display a generic error.
          // eslint-disable-next-line no-console
          console.error('Failed to load recipes:', err);
          setError('Unable to load recipes. Please try again later.');
          setStatus('error');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const distinct = new Set();
    recipes.forEach((r) => {
      if (r.category) distinct.add(r.category);
    });
    return Array.from(distinct).sort((a, b) => a.localeCompare(b));
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'all' || recipe.category === selectedCategory;
      const matchesQuery = recipeMatchesQuery(recipe, searchQuery);
      return matchesCategory && matchesQuery;
    });
  }, [recipes, searchQuery, selectedCategory]);

  const value = useMemo(
    () => ({
      recipes,
      filteredRecipes,
      categories,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      status,
      error,
      isMock: isUsingMockData(),
      /**
       * PUBLIC_INTERFACE
       * Retrieve a single recipe by id using the current data source.
       *
       * @param {string} id - Recipe identifier.
       * @returns {Promise<Recipe|null>} The recipe or null if not found.
       */
      getRecipeById,
    }),
    [
      recipes,
      filteredRecipes,
      categories,
      searchQuery,
      selectedCategory,
      status,
      error,
    ]
  );

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * Access the recipe context from within components.
 *
 * @returns {ReturnType<RecipeProvider['value']>} Recipe context value.
 */
export function useRecipes() {
  const ctx = useContext(RecipeContext);
  if (!ctx) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return ctx;
}
