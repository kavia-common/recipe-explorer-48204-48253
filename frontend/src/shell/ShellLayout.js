import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { Navbar } from './components/Navbar';
import { CategorySidebar } from './components/CategorySidebar';

/**
 * PUBLIC_INTERFACE
 * Shell layout for the application.
 *
 * Renders the top navigation (with search), the category sidebar, and the
 * main content area where routed pages appear.
 */
export function ShellLayout() {
  const {
    categories,
    filteredRecipes,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    status,
    isMock,
  } = useRecipes();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="app-shell">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isMock={isMock}
        onBrandClick={handleLogoClick}
      />
      <main className="app-main" aria-label="Recipe Explorer main content">
        <aside className="sidebar" aria-label="Recipe categories">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            totalCount={filteredRecipes.length}
            status={status}
            isMock={isMock}
          />
        </aside>
        <section className="main-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
