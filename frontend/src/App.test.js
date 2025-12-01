import { render } from '@testing-library/react';
import App from './App';

test('renders application without crashing', () => {
  const { unmount } = render(<App />);
  // If render throws, the test will fail; we do not need a specific DOM assertion here.
  unmount();
});
