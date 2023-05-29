import { render, fireEvent } from '@testing-library/react';
import Footer from 'components/Footer';
import { ALL, TODO, COMPLETED } from 'constants/AppConstants';

describe('Footer component', () => {
  const mockToDoCount = 3;
  const mockClearCompleted = jest.fn();
  const mockSetActiveState = jest.fn();
  const mockActiveState = ALL;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct todo count', () => {
    const component = render(
      <Footer
        toDoCount={mockToDoCount}
        clearCompleted={mockClearCompleted}
        setActiveState={mockSetActiveState}
        activeState={mockActiveState}
      />
    );
    const element = component.getByTestId("todo-count");
    expect(element.textContent).toEqual(mockToDoCount.toString());
  });

  it('calls setActiveState when clicking on All filter', () => {
    const { getByText } = render(
      <Footer
        toDoCount={mockToDoCount}
        clearCompleted={mockClearCompleted}
        setActiveState={mockSetActiveState}
        activeState={mockActiveState}
      />
    );

    const allFilter = getByText('All');
    fireEvent.click(allFilter);

    expect(mockSetActiveState).toHaveBeenCalledTimes(1);
    expect(mockSetActiveState).toHaveBeenCalledWith(ALL);
  });

  it('calls setActiveState when clicking on Todo filter', () => {
    const { getByText } = render(
      <Footer
        toDoCount={mockToDoCount}
        clearCompleted={mockClearCompleted}
        setActiveState={mockSetActiveState}
        activeState={mockActiveState}
      />
    );

    const todoFilter = getByText('To Do');
    fireEvent.click(todoFilter);

    expect(mockSetActiveState).toHaveBeenCalledTimes(1);
    expect(mockSetActiveState).toHaveBeenCalledWith(TODO);
  });

  it('calls setActiveState when clicking on Completed filter', () => {
    const { getByText } = render(
      <Footer
        toDoCount={mockToDoCount}
        clearCompleted={mockClearCompleted}
        setActiveState={mockSetActiveState}
        activeState={mockActiveState}
      />
    );

    const completedFilter = getByText('Completed');
    fireEvent.click(completedFilter);

    expect(mockSetActiveState).toHaveBeenCalledTimes(1);
    expect(mockSetActiveState).toHaveBeenCalledWith(COMPLETED);
  });

  it('calls clearCompleted when clicking on Clear Completed link', () => {
    const { getByText } = render(
      <Footer
        toDoCount={mockToDoCount}
        clearCompleted={mockClearCompleted}
        setActiveState={mockSetActiveState}
        activeState={mockActiveState}
      />
    );

    const clearCompletedLink = getByText('Clear Completed');
    fireEvent.click(clearCompletedLink);

    expect(mockClearCompleted).toHaveBeenCalledTimes(1);
  });
});
