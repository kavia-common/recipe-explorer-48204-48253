import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';

/**
 * PUBLIC_INTERFACE
 * Recipe details page for viewing a single recipe's ingredients and instructions.
 */
export function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById } = useRecipes();

  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | not-found

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      const found = await getRecipeById(id);
      if (!cancelled) {
        if (found) {
          setRecipe(found);
          setStatus('ready');
        } else {
          setStatus('not-found');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id, getRecipeById]);

  const handleBack = () => {
    navigate(-1);
  };

  if (status === 'loading') {
    return (
      <div className="details-shell">
        <p className="helper-text">Loading recipe…</p>
      </div>
    );
  }

  if (status === 'not-found' || !recipe) {
    return (
      <div className="details-shell">
        <div className="details-card">
          <div>
            <header className="details-header">
              <div className="details-kicker-row">
                <span className="details-kicker">Recipe not found</span>
              </div>
              <h1 className="details-title">We couldn&apos;t find that recipe.</h1>
              <p className="details-subtitle">
                The recipe you&apos;re looking for may have been removed or your link
                is out of date.
              </p>
            </header>
            <button
              type="button"
              className="button-ghost"
              onClick={handleBack}
            >
              ← Back to recipes
            </button>
          </div>
          <div className="details-media">
            <div className="details-media-inner" />
            <div className="details-media-overlay" />
            <div className="details-media-content">
              <div className="details-media-top">
                <div className="details-media-label">Status</div>
                <div className="details-media-chip">Missing</div>
              </div>
              <div className="details-media-bottom">
                <div className="details-media-rating">
                  <div className="details-media-rating-score">404</div>
                  <div className="details-media-rating-caption">
                    This card is just for show.
                  </div>
                </div>
                <div className="details-media-meta">
                  <div className="details-media-meta-line">
                    Return to the grid to keep browsing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    category,
    ingredients,
    instructions,
    cookTimeMinutes,
    difficultyLabel,
    popularityScore,
  } = recipe;

  return (
    <div className="details-shell">
      <div className="details-card">
        <div>
          <header className="details-header">
            <div className="details-kicker-row">
              <span className="details-kicker">Recipe details</span>
              {category && <span className="details-badge">{category}</span>}
            </div>
            <h1 className="details-title">{title}</h1>
            {description && (
              <p className="details-subtitle">{description}</p>
            )}

            <div className="details-meta-row">
              {cookTimeMinutes != null && (
                <span className="details-meta-pill">
                  <span className="details-meta-dot" aria-hidden="true" />
                  <span>Cook time</span>
                  <span>{cookTimeMinutes} min</span>
                </span>
              )}
              {difficultyLabel && (
                <span className="details-meta-pill">
                  <span className="details-meta-dot" aria-hidden="true" />
                  <span>{difficultyLabel}</span>
                </span>
              )}
              {popularityScore != null && (
                <span className="details-meta-pill">
                  <span className="details-meta-dot" aria-hidden="true" />
                  <span>{popularityScore}% saved</span>
                </span>
              )}
            </div>
          </header>

          <section aria-labelledby="ingredients-heading" style={{ marginBottom: '0.9rem' }}>
            <h2 id="ingredients-heading" className="details-section-heading">
              Ingredients
            </h2>
            {ingredients && ingredients.length > 0 ? (
              <ul className="details-ingredients-list">
                {ingredients.map((item) => (
                  <li key={item} className="details-ingredient-item">
                    <span
                      className="details-ingredient-bullet"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="helper-text">No ingredients listed for this recipe.</p>
            )}
          </section>

          <section aria-labelledby="instructions-heading">
            <h2 id="instructions-heading" className="details-section-heading">
              Instructions
            </h2>
            {instructions ? (
              <p className="details-instructions">{instructions}</p>
            ) : (
              <p className="helper-text">
                Instructions are not available for this recipe yet.
              </p>
            )}
          </section>

          <div style={{ marginTop: '0.9rem' }}>
            <button
              type="button"
              className="button-ghost"
              onClick={handleBack}
            >
              ← Back to recipes
            </button>
          </div>
        </div>

        <aside className="details-media" aria-hidden="true">
          <div className="details-media-inner" />
          <div className="details-media-overlay" />
          <div className="details-media-content">
            <div className="details-media-top">
              <div className="details-media-label">Quick snapshot</div>
              {category && (
                <div className="details-media-chip">{category}</div>
              )}
            </div>
            <div className="details-media-bottom">
              <div className="details-media-rating">
                <div className="details-media-rating-score">
                  {popularityScore != null ? `${popularityScore}%` : 'Chef'}
                </div>
                <div className="details-media-rating-caption">
                  Saved by home cooks globally.
                </div>
              </div>
              <div className="details-media-meta">
                {cookTimeMinutes != null && (
                  <div className="details-media-meta-line">
                    • Approx. {cookTimeMinutes} minutes
                  </div>
                )}
                {difficultyLabel && (
                  <div className="details-media-meta-line">
                    • {difficultyLabel}
                  </div>
                )}
                <div className="details-media-meta-line">
                  Enjoy with something cold and refreshing.
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
