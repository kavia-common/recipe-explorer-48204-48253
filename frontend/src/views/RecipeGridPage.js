import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from './components/RecipeCard';

/**
 * PUBLIC_INTERFACE
 * Home page displaying the grid of recipes.
 */
export function RecipeGridPage() {
  const { filteredRecipes, selectedCategory, searchQuery, status } = useRecipes();

  const heading =
    selectedCategory === 'all' ? 'Handpicked recipes' : selectedCategory;

  const subheading =
    searchQuery && searchQuery.trim().length > 0
      ? `Filtered by “${searchQuery.trim()}”`
      : 'Discover meals, sides, and everyday favorites.';

  const showEmpty =
    status === 'ready' && filteredRecipes.length === 0 && searchQuery;

  return (
    <>
      <header className="section-header">
        <div className="section-title-block">
          <div className="section-kicker">Today&apos;s suggestions</div>
          <h1 className="section-title">{heading}</h1>
          <p className="section-description">{subheading}</p>
        </div>
        <div className="section-meta">
          {status === 'loading' && 'Loading recipes…'}
          {status === 'error' && 'Unable to load recipes.'}
          {status === 'ready' &&
            !showEmpty &&
            `${filteredRecipes.length} recipe${
              filteredRecipes.length === 1 ? '' : 's'
            } available`}
          {showEmpty && 'No recipes match your current filters.'}
        </div>
      </header>

      <section className="recipe-grid-panel" aria-label="Recipes">
        {showEmpty ? (
          <p className="helper-text">
            Try broadening your search keywords or clearing the category filter.
          </p>
        ) : (
          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
