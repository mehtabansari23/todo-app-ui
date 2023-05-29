import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ToDo App Text ', () => {
  render(<App />);
  const linkElement = screen.getByText("ToDo App");
  expect(linkElement).toBeInTheDocument();
});
