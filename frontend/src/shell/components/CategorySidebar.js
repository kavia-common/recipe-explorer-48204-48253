import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar listing recipe categories with an "All recipes" option.
 *
 * @param {Object} props
 * @param {string[]} props.categories - List of available categories.
 * @param {string} props.selectedCategory - Currently selected category key.
 * @param {(value: string) => void} props.onCategoryChange - Callback when a category is selected.
 * @param {number} props.totalCount - Count of recipes that match the current filters.
 * @param {'idle'|'loading'|'ready'|'error'} props.status - Loading status for the data set.
 * @param {boolean} props.isMock - Whether the data layer uses mock recipes.
 */
export function CategorySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  totalCount,
  status,
  isMock,
}) {
  const showLoading = status === 'loading';
  const showError = status === 'error';

  const metaLabel = useMemo(() => {
    if (showLoading) return 'Syncing recipes…';
    if (showError) return 'Unable to refresh recipes';
    return totalCount === 1 ? '1 match' : `${totalCount} matches`;
  }, [showLoading, showError, totalCount]);

  const handleSelect = (value) => {
    onCategoryChange(value);
  };

  return (
    <div className="sidebar-panel">
      <header className="sidebar-header">
        <div className="sidebar-title-group">
          <div className="sidebar-title">Browse</div>
          <div className="sidebar-subtitle">
            Filter recipes by category or see them all.
          </div>
        </div>
        <span className="sidebar-count">
          {status === 'loading' ? 'Loading…' : metaLabel}
        </span>
      </header>

      <nav className="category-list" aria-label="Recipe categories">
        <button
          type="button"
          className={
            selectedCategory === 'all'
              ? 'category-pill category-pill--active'
              : 'category-pill'
          }
          onClick={() => handleSelect('all')}
        >
          <span className="category-pill-main">
            <span className="category-dot" aria-hidden="true" />
            <span className="category-label">All recipes</span>
          </span>
          <span className="category-count">{totalCount}</span>
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={
              selectedCategory === category
                ? 'category-pill category-pill--active'
                : 'category-pill'
            }
            onClick={() => handleSelect(category)}
          >
            <span className="category-pill-main">
              <span className="category-label">{category}</span>
            </span>
            {/* In a future backend integration, we might compute per-category counts. */}
          </button>
        ))}
      </nav>

      <footer className="sidebar-footer">
        <div className="sidebar-meta-line">
          <span>Data mode</span>
          <span className="sidebar-meta-pill">
            {isMock ? 'Local mock recipes' : 'Backend API'}
          </span>
        </div>
        <div className="sidebar-meta-line">
          <span>Search scope</span>
          <span className="sidebar-meta-pill">Title &amp; ingredients</span>
        </div>
      </footer>
    </div>
  );
}
