# Recipe Explorer Frontend

A lightweight React application that lets users browse, search, and view recipes using an **Ocean Professional** theme.

The UI includes:

- A top navigation bar with global search
- A sidebar for category filtering
- A responsive grid of recipe cards
- Dedicated recipe detail pages with ingredients and instructions

## Getting Started

In the `frontend` directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Data Source: Mock vs. API

The Recipe Explorer is designed to work **out of the box** using a local mock data layer, while being ready to switch to a real backend API.

The behavior is controlled by the `REACT_APP_API_BASE` environment variable:

- **When `REACT_APP_API_BASE` is _not_ set or empty**  
  The app uses local mock recipes defined in `src/services/recipeService.js`.
- **When `REACT_APP_API_BASE` is set**  
  `recipeService` is the single integration point for calling your backend. The UI will display that it is using the API.

The logic lives in:

- `src/services/recipeService.js` – `isUsingMockData`, `getRecipes`, `getRecipeById`
- `src/context/RecipeContext.js` – Provides recipes, filters, and loading state to the UI

> TODO (for future backend integration): Replace the mock implementation in `getRecipes` and `getRecipeById` with real HTTP calls to your backend using `process.env.REACT_APP_API_BASE`.

## Environment Variables

An `.env.example` file is provided in this directory with the relevant keys, including:

```bash
REACT_APP_API_BASE=
REACT_APP_BACKEND_URL=
REACT_APP_FRONTEND_URL=
REACT_APP_WS_URL=
REACT_APP_NODE_ENV=development
REACT_APP_NEXT_TELEMETRY_DISABLED=1
REACT_APP_ENABLE_SOURCE_MAPS=true
REACT_APP_PORT=3000
REACT_APP_TRUST_PROXY=false
REACT_APP_LOG_LEVEL=info
REACT_APP_HEALTHCHECK_PATH=/health
REACT_APP_FEATURE_FLAGS=
REACT_APP_EXPERIMENTS_ENABLED=false
```

Copy this file to `.env` and fill in values as needed.  
**Do not commit your `.env` file.**

## Project Structure

Key files and directories:

- `src/App.js` – Root component wiring together context and routing
- `src/router/AppRouter.js` – Client-side routing (`/` and `/recipe/:id`)
- `src/context/RecipeContext.js` – Global state for recipes, filters, and data source
- `src/services/recipeService.js` – Data access abstraction with mock data and TODO for API
- `src/shell/ShellLayout.js` – Main layout (navbar, sidebar, and content area)
- `src/shell/components/Navbar.js` – Top navigation with search and data-source status
- `src/shell/components/CategorySidebar.js` – Category filter sidebar
- `src/views/RecipeGridPage.js` – Home page showing recipe cards
- `src/views/RecipeDetailsPage.js` – Recipe detail view
- `src/views/components/RecipeCard.js` – Card component used in the recipe grid
- `src/App.css` – Ocean Professional theme and layout styling
- `src/index.css` – Base typography and reset

## Testing

A simple smoke test exists in `src/App.test.js` to ensure the app renders without crashing. You can extend this with more detailed tests for components and behaviors as needed.
