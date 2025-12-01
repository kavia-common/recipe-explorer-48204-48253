import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ShellLayout } from '../shell/ShellLayout';
import { RecipeGridPage } from '../views/RecipeGridPage';
import { RecipeDetailsPage } from '../views/RecipeDetailsPage';

/**
 * PUBLIC_INTERFACE
 * Top-level router for the Recipe Explorer app.
 *
 * Provides two main routes:
 * - `/` for the recipe grid with filters and search
 * - `/recipe/:id` for the recipe details view
 */
export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<ShellLayout />}>
          <Route path="/" element={<RecipeGridPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
