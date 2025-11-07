import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import * as api from '../../api/fake-api';
import TodoListScreen from '../index';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('TodoListScreen navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(api, 'fakeApiWithFetch').mockResolvedValueOnce(
      new Response(JSON.stringify([
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Build a Todo App' },
      ]), { status: 200 })
    );
  });

  it('navigates to detail screen when item is pressed', async () => {
    const { findByText } = render(<TodoListScreen />);
    const firstTodo = await findByText('Learn React Native');

    fireEvent.press(firstTodo);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/details/[id]',
      params: { id: '1' },
    });
  });
});
