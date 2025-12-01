/**
 * Determine whether the application should use mock data.
 *
 * If REACT_APP_API_BASE is not set or is an empty string, the app uses
 * local mock recipes. When REACT_APP_API_BASE is provided, this module
 * is the single place that should be updated to call the real backend.
 *
 * TODO: When a backend API is available, replace the mock implementations
 * in this file with real HTTP calls using REACT_APP_API_BASE.
 *
 * @returns {boolean} True if the data layer is currently backed by mock data.
 */
// PUBLIC_INTERFACE
export function isUsingMockData() {
  const base = process.env.REACT_APP_API_BASE;
  return !base || String(base).trim() === '';
}

/**
 * PUBLIC_INTERFACE
 * Retrieve all recipes.
 *
 * In the current implementation this function returns local mock data if
 * no API base URL is configured. When REACT_APP_API_BASE is defined, this
 * function is the appropriate place to implement an HTTP request to
 * `${REACT_APP_API_BASE}/recipes` (or similar).
 *
 * @returns {Promise<Array>} Promise of an array of recipe objects.
 */
export async function getRecipes() {
  if (isUsingMockData()) {
    // Local mock implementation
    return Promise.resolve(MOCK_RECIPES);
  }

  // Placeholder for future API implementation.
  // Example skeleton:
  //
  // const response = await fetch(`${process.env.REACT_APP_API_BASE}/recipes`);
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch recipes: ${response.status}`);
  // }
  // return response.json();
  //
  // For now, fall back to mock data to keep the UI functional.
  return Promise.resolve(MOCK_RECIPES);
}

/**
 * PUBLIC_INTERFACE
 * Retrieve a single recipe by id.
 *
 * @param {string} id - Recipe identifier.
 * @returns {Promise<Object|null>} Promise resolving to the recipe or null.
 */
export async function getRecipeById(id) {
  const all = await getRecipes();
  const found = all.find((r) => String(r.id) === String(id));
  return found || null;
}

/**
 * A small set of curated mock recipes to be used when no backend API exists.
 *
 * These are intentionally rich enough to exercise search and filtering
 * (categories, ingredients, different cook times and difficulty levels).
 */
const MOCK_RECIPES = [
  {
    id: '1',
    title: 'Citrus Herb Baked Salmon',
    description: 'Oven-baked salmon with fresh herbs, lemon, and garlic butter.',
    category: 'Dinner',
    ingredients: [
      'Salmon fillets',
      'Lemon',
      'Fresh dill',
      'Garlic',
      'Olive oil',
      'Sea salt',
      'Black pepper',
    ],
    instructions:
      '1. Preheat oven to 400°F (200°C).\n' +
      '2. Pat salmon dry and place on a lined baking sheet.\n' +
      '3. Whisk together olive oil, minced garlic, chopped dill, lemon zest, salt, and pepper.\n' +
      '4. Brush mixture over salmon and top with lemon slices.\n' +
      '5. Bake for 12–15 minutes until salmon flakes easily with a fork.\n' +
      '6. Rest for 2 minutes before serving.',
    cookTimeMinutes: 25,
    difficultyIndex: 2,
    difficultyLabel: 'Weeknight-easy',
    popularityScore: 94,
  },
  {
    id: '2',
    title: 'Roasted Vegetable Quinoa Bowl',
    description:
      'A hearty grain bowl layered with roasted vegetables, quinoa, and a lemon-tahini drizzle.',
    category: 'Lunch',
    ingredients: [
      'Quinoa',
      'Sweet potato',
      'Broccoli',
      'Red onion',
      'Chickpeas',
      'Tahini',
      'Lemon',
      'Paprika',
    ],
    instructions:
      '1. Preheat oven to 425°F (220°C).\n' +
      '2. Toss cubed sweet potato, broccoli florets, and sliced red onion with olive oil, salt, pepper, and paprika.\n' +
      '3. Roast for 20–25 minutes, adding chickpeas in the last 8 minutes.\n' +
      '4. Cook quinoa according to package instructions.\n' +
      '5. Whisk tahini, lemon juice, warm water, garlic, and a pinch of salt into a pourable sauce.\n' +
      '6. Assemble bowls with quinoa, roasted vegetables, and a generous drizzle of tahini sauce.',
    cookTimeMinutes: 35,
    difficultyIndex: 2,
    difficultyLabel: 'Prep-focused',
    popularityScore: 88,
  },
  {
    id: '3',
    title: 'Blueberry Overnight Oats',
    description: 'Creamy oats soaked overnight with chia seeds, yogurt, and fresh blueberries.',
    category: 'Breakfast',
    ingredients: [
      'Rolled oats',
      'Greek yogurt',
      'Milk or oat milk',
      'Chia seeds',
      'Honey or maple syrup',
      'Blueberries',
      'Vanilla extract',
    ],
    instructions:
      '1. In a jar, combine oats, chia seeds, yogurt, milk, sweetener, and vanilla.\n' +
      '2. Stir until well combined and press down to submerge oats.\n' +
      '3. Top with blueberries, cover, and refrigerate at least 4 hours or overnight.\n' +
      '4. Stir before serving and adjust consistency with a splash of milk if needed.',
    cookTimeMinutes: 10,
    difficultyIndex: 1,
    difficultyLabel: 'Hands-off',
    popularityScore: 91,
  },
  {
    id: '4',
    title: 'Spiced Tomato Lentil Soup',
    description: 'A cozy, protein-rich soup with red lentils, tomatoes, and warm spices.',
    category: 'Dinner',
    ingredients: [
      'Red lentils',
      'Crushed tomatoes',
      'Vegetable broth',
      'Onion',
      'Garlic',
      'Cumin',
      'Smoked paprika',
      'Coconut milk',
    ],
    instructions:
      '1. Sauté diced onion in olive oil until translucent, then add garlic and spices.\n' +
      '2. Stir in rinsed lentils, tomatoes, and broth.\n' +
      '3. Simmer for 20–25 minutes until lentils are tender.\n' +
      '4. Finish with coconut milk, season to taste, and serve warm.',
    cookTimeMinutes: 40,
    difficultyIndex: 2,
    difficultyLabel: 'One-pot',
    popularityScore: 83,
  },
  {
    id: '5',
    title: 'Crisp Garden Salad with Lemon Vinaigrette',
    description: 'A fresh, crunchy salad with seasonal greens and a bright lemon dressing.',
    category: 'Lunch',
    ingredients: [
      'Mixed greens',
      'Cucumber',
      'Cherry tomatoes',
      'Radishes',
      'Red onion',
      'Feta cheese',
      'Lemon',
      'Olive oil',
      'Dijon mustard',
    ],
    instructions:
      '1. Chop vegetables into bite-sized pieces and combine with greens in a large bowl.\n' +
      '2. Whisk lemon juice, olive oil, Dijon mustard, salt, and pepper into a smooth dressing.\n' +
      '3. Toss salad with dressing just before serving and top with crumbled feta.',
    cookTimeMinutes: 15,
    difficultyIndex: 1,
    difficultyLabel: 'Fresh & fast',
    popularityScore: 79,
  },
];
