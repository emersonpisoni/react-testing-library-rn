import { render } from '@testing-library/react-native';
import React from 'react';
import * as api from '../../api/fake-api';
import TodoListScreen from '../index';

describe('TodoListScreen async', () => {
  beforeEach(() => {
    // global.fetch = jest.fn(() =>
    //   Promise.resolve({
    //     json: () =>
    //       Promise.resolve([
    //         { id: 1, title: 'Learn React Native' },
    //         { id: 2, title: 'Build a Todo App' },
    //       ]),
    //   })
    // ) as jest.Mock;
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows Loading text initially', async () => {
    const { getByText, findByText } = render(<TodoListScreen />);
    expect(await findByText('Loading...')).toBeTruthy();
  });

  it('shows todos items after get them from api', async () => {
    jest.spyOn(api, 'fakeApiWithFetch').mockResolvedValueOnce(
      new Response(JSON.stringify([
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Build a Todo App' },
      ]), { status: 200 })
    );

    const { findByText, queryByText } = render(<TodoListScreen />);

    expect(queryByText('Loading...')).toBeTruthy();

    expect(await findByText('Learn React Native')).toBeTruthy();
    expect(await findByText('Build a Todo App')).toBeTruthy();

    expect(queryByText('Loading...')).toBeNull();
  });
});


describe('TodoListScreen (error flow)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows error message when fetch fails', async () => {
    // global.fetch = jest.fn(() =>
    //   Promise.reject(new Error('Network error'))
    // ) as jest.Mock;

    jest.spyOn(api, 'fakeApiWithFetch').mockRejectedValueOnce(new Error('Network error'))

    const { getByText, queryByText, findByText } = render(<TodoListScreen />);

    expect(getByText('Loading...')).toBeTruthy();

    expect(await findByText('Failed to load tasks')).toBeTruthy();

    expect(queryByText('Loading...')).toBeNull();
  });
});


// describe('TodoListScreen', () => {
//   it('shows "No tasks" text when there are no tasks in the list', () => {
//     const { getByText } = render(<TodoListScreen />);
//     expect(getByText('No tasks')).toBeTruthy();
//   });

//   it('adds a new item to the list', () => {
//     const { getByPlaceholderText, getByText, queryByText } = render(<TodoListScreen />);

//     const input = getByPlaceholderText('Type a task');
//     const button = getByText('Add');

//     fireEvent.changeText(input, 'Study testing');
//     fireEvent.press(button);

//     expect(queryByText('No tasks')).toBeNull();
//     expect(getByText('Study testing')).toBeTruthy();
//   });

//   it('removes an item from the list', () => {
//     const { getByPlaceholderText, getByText, queryByText } = render(<TodoListScreen />);
//     const input = getByPlaceholderText('Type a task');
//     const addButton = getByText('Add');

//     fireEvent.changeText(input, 'Study testing');
//     fireEvent.press(addButton);

//     expect(getByText('Study testing')).toBeTruthy();

//     const removeButton = getByText('Remove');
//     fireEvent.press(removeButton);

//     expect(queryByText('Study testing')).toBeNull();
//   });
// });
