import React from 'react';
import './App.css';
import { RecipeProvider } from './context/RecipeContext';
import { AppRouter } from './router/AppRouter';

/**
 * Root application component for the Recipe Explorer.
 *
 * Wraps the routed application in RecipeProvider so that search, category
 * filters, recipes, and environment-driven data sources are available
 * throughout the tree.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <RecipeProvider>
      <div className="app-root">
        <AppRouter />
      </div>
    </RecipeProvider>
  );
}

export default App;
