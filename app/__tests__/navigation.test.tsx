import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import * as api from '../../api/fake-api';
import DetailsScreen from '../details/[id]';
import TodoListScreen from '../index';

const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
  useLocalSearchParams: () => ({
    id: '1',
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

  it('navigates back from detail screen', async () => {
    const { findByText, findByTestId } = render(<DetailsScreen />);
    const button = await findByText('Go Back');

    fireEvent.press(button);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
