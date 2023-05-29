import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  it('calls deleteToDo when delete button is clicked', () => {
    const { getByRole } = render(
      <ToDo
        toDo={mockToDo}
        deleteToDo={mockDeleteToDo}
        index={mockIndex}
        updateToDo={mockUpdateToDo}
      />
    );

    const deleteButton = getByRole('button');
    fireEvent.click(deleteButton);

    expect(mockDeleteToDo).toHaveBeenCalledTimes(1);
    expect(mockDeleteToDo).toHaveBeenCalledWith(mockToDo, mockIndex);
  });

  it('renders an input text field when double clicked and calls updateToDo when blurred', () => {
    const { getByText, getByRole } = render(
      <ToDo
        toDo={mockToDo}
        deleteToDo={mockDeleteToDo}
        index={mockIndex}
        updateToDo={mockUpdateToDo}
      />
    );

    const todoNameElement = getByText(mockToDo.name);
    fireEvent.doubleClick(todoNameElement);

    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Updated Test 1' } });
    fireEvent.blur(inputElement);

    expect(inputElement).toHaveDisplayValue('Updated Test 1');
    expect(mockUpdateToDo).toHaveBeenCalledTimes(1);
    expect(mockUpdateToDo).toHaveBeenCalledWith({ ...mockToDo, name: 'Updated Test 1' });
  });
});
