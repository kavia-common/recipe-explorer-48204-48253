import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Recipe card used in the grid view.
 *
 * @param {Object} props
 * @param {Object} props.recipe - Recipe object for this card.
 */
export function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${encodeURIComponent(recipe.id)}`);
  };

  return (
    <article
      className="recipe-card"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${recipe.title}`}
    >
      <div className="recipe-card-media">
        <div className="recipe-card-media-gradient" />
        <div className="recipe-card-media-overlay" />
        <div className="recipe-card-media-sheen" />
        <span className="recipe-card-media-tag">Featured</span>
        {recipe.category && (
          <span className="recipe-card-media-badge">
            <span className="recipe-card-media-dot" aria-hidden="true" />
            <span>{recipe.category}</span>
          </span>
        )}
      </div>
      <div className="recipe-card-body">
        <div className="recipe-card-title-row">
          <h2 className="recipe-card-title">{recipe.title}</h2>
          {recipe.cookTimeMinutes != null && (
            <span className="recipe-card-meta">
              {recipe.cookTimeMinutes} min
            </span>
          )}
        </div>
        {recipe.description && (
          <p className="recipe-card-desc">{recipe.description}</p>
        )}
        <div className="recipe-card-footer">
          <span className="recipe-card-tagline">View recipe</span>
          {recipe.difficultyLabel && (
            <span className="recipe-card-pill">{recipe.difficultyLabel}</span>
          )}
        </div>
      </div>
    </article>
  );
}
