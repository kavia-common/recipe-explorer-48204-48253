import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Top navigation bar with application branding and global search input.
 *
 * @param {Object} props
 * @param {string} props.searchQuery - Current search text.
 * @param {(value: string) => void} props.onSearchChange - Callback when search text changes.
 * @param {boolean} props.isMock - Whether the data layer is currently using mock data.
 * @param {() => void} props.onBrandClick - Invoked when the brand/logo is clicked.
 */
export function Navbar({ searchQuery, onSearchChange, isMock, onBrandClick }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          type="button"
          className="navbar-brand"
          aria-label="Recipe Explorer home"
          onClick={onBrandClick}
        >
          <span className="brand-mark">
            <span className="brand-mark-inner" />
          </span>
          <span>
            <div className="brand-text-main">Recipe Explorer</div>
            <div className="brand-text-sub">Ocean kitchen library</div>
          </span>
        </button>

        <div className="nav-search" aria-label="Recipe search">
          <label className="nav-search-label">
            <span className="nav-search-icon" aria-hidden="true" />
            <input
              type="search"
              className="nav-search-input"
              placeholder="Search by recipe or ingredient…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search recipes by title or ingredients"
            />
          </label>
        </div>

        <div className="navbar-spacer" />

        <div className="navbar-actions" aria-label="Data source status">
          <div className="nav-pill">
            <span className="nav-pill-dot" aria-hidden="true" />
            <span>{isMock ? 'Mock data' : 'API connected'}</span>
          </div>
          <span className="nav-meta">
            {isMock
              ? 'REACT_APP_API_BASE not set'
              : 'Using REACT_APP_API_BASE endpoint'}
          </span>
        </div>
      </div>
    </header>
  );
}
