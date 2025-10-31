import { fireEvent, render } from '@testing-library/react-native';
import TodoListScreen from '../index';

describe('TodoListScreen', () => {
  it('shows "No tasks" text when there are no tasks in the list', () => {
    const { getByText } = render(<TodoListScreen />);
    expect(getByText('No tasks')).toBeTruthy();
  });

  it('adds a new item to the list', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoListScreen />);

    const input = getByPlaceholderText('Type a task');
    const button = getByText('Add');

    fireEvent.changeText(input, 'Study testing');
    fireEvent.press(button);

    expect(queryByText('No tasks')).toBeNull();
    expect(getByText('Study testing')).toBeTruthy();
  });

  it('removes an item from the list', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoListScreen />);
    const input = getByPlaceholderText('Type a task');
    const addButton = getByText('Add');

    fireEvent.changeText(input, 'Study testing');
    fireEvent.press(addButton);

    expect(getByText('Study testing')).toBeTruthy();

    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    expect(queryByText('Study testing')).toBeNull();
  });
});
