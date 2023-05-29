import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import ToDo from 'components/ToDo';
import ToDoTO from 'model/ToDoTO';

describe('ToDo component', () => {
  const mockToDo = new ToDoTO(1, 'Test 1', false);
  const mockDeleteToDo = jest.fn();
  const mockIndex = 0;
  const mockUpdateToDo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the todo name correctly', () => {
    const { getByText } = render(
      <ToDo
        toDo={mockToDo}
        deleteToDo={mockDeleteToDo}
        index={mockIndex}
        updateToDo={mockUpdateToDo}
      />
    );

    const todoNameElement = getByText(mockToDo.name);
    expect(todoNameElement).toBeInTheDocument();
  });

  it('calls updateToDo with the updated todo when checkbox is checked', () => {
    const { getByRole } = render(
      <ToDo
        toDo={mockToDo}
        deleteToDo={mockDeleteToDo}
        index={mockIndex}
        updateToDo={mockUpdateToDo}
      />
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockUpdateToDo).toHaveBeenCalledTimes(1);
    expect(mockUpdateToDo).toHaveBeenCalledWith({ ...mockToDo, completed: true });
  });
});
