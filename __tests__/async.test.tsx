import { fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native';
import React from 'react';
import * as api from '../api/fake-api';
import TodoListScreen from '../app/index';

describe('TodoListScreen async', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows Loading text initially', () => {
    const { getByText } = render(<TodoListScreen />);

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('shows todos items after get them from api', async () => {
    jest.spyOn(api, 'fakeApiWithFetch').mockResolvedValueOnce(
      new Response(JSON.stringify([
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Build a Todo App' },
      ]), { status: 200 })
    );

    const { findByText, getByText, queryByText } = render(<TodoListScreen />);

    expect(getByText('Loading...')).toBeTruthy();
    expect(await findByText('Learn React Native', {}, { timeout: 5000 })).toBeTruthy();
    expect(await findByText('Build a Todo App')).toBeTruthy();
    expect(queryByText('Loading...')).toBeNull();
  });

  it('hides loading after get data from api', async () => {
    jest.spyOn(api, 'fakeApiWithFetch').mockResolvedValueOnce(
      new Response(JSON.stringify([
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Build a Todo App' },
      ]), { status: 200 })
    );

    const { getByText } = render(<TodoListScreen />);

    await waitForElementToBeRemoved(() => getByText('Loading...'), { timeout: 5000 });
    // await waitFor(() => {
    //   expect(getByText('Loading...')).not.toBeTruthy();
    // })
    expect(getByText('Todo List')).toBeTruthy();
  });
});


describe('TodoListScreen (error flow)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows error message when fetch fails', async () => {
    jest.spyOn(api, 'fakeApiWithFetch').mockRejectedValueOnce(new Error('Network error'))

    const { getByText, queryByText, findByText } = render(<TodoListScreen />);

    expect(getByText('Loading...')).toBeTruthy();
    expect(await findByText('Failed to load tasks')).toBeTruthy();
    expect(queryByText('Loading...')).toBeNull();
  });
});

describe('waitFor vs findBy', () => {
  it('uses waitFor to wait multiple conditions', async () => {
    jest.spyOn(api, 'fakeApiWithFetch').mockResolvedValueOnce(
      new Response(JSON.stringify([
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Build a Todo App' },
      ]), { status: 200 })
    );

    const { findByPlaceholderText, getByText, getAllByText } =
      render(<TodoListScreen />);

    const input = await findByPlaceholderText('Type a task', {}, { timeout: 12000 });

    fireEvent.changeText(input, 'Make dinner');
    fireEvent.press(getByText('Add'));

    await waitFor(() => {
      console.log('Checking for both tasks');
      expect(getAllByText(/Learn React Native|Make dinner/)).toHaveLength(2);
    });
  }, 15000);
});

describe('Comparing waitFor and waitForElementToBeRemoved', () => {
  beforeEach(() => {
    jest.spyOn(api, 'fakeApiWithFetch').mockResolvedValue(
      new Response(JSON.stringify([{ id: 1, title: 'Read a book' }]), {
        status: 200,
      })
    );
  })


  it('findBy behavior', async () => {
    const { findByText } = render(<TodoListScreen />);
    const todo = findByText('Read a books', {}, { timeout: 2500 })

    console.log('todo found:', todo);
    await expect(todo).rejects.toBeTruthy();
  })

  it('waitFor behavior', async () => {
    const { queryByText } = render(<TodoListScreen />);

    await waitFor(
      () => {
        const loading = queryByText('Loading...');
        if (loading) {
          console.log('Still appearing Loading...');
          throw new Error('Still loading');
        }
        console.log('Loading is gone!');
        expect(loading).toBeNull();
      },
      { timeout: 2500 }
    );
  });

  it('waitForElementToBeRemoved behavior', async () => {
    const { getByText } = render(<TodoListScreen />);

    await waitForElementToBeRemoved(() => getByText('Loading...'), {
      timeout: 2500,
    });
    console.log('Loading is gone!');
  });
});