import { render, waitFor } from '@testing-library/react-native';
import * as api from '../api/fake-api';
import TodoListScreen from '../app/(tabs)/index';

describe('🧪 Performance – findBy vs waitFor', () => {
  beforeEach(() => {
    jest.spyOn(api, 'fakeApiWithFetch').mockResolvedValue(
      new Response(JSON.stringify([{ id: 1, title: 'Read a book' }]), {
        status: 200,
      })
    );
  })

  it('Measures findByText performance', async () => {
    const { findByText } = render(<TodoListScreen />);

    const start = performance.now();
    const el = await findByText('Loading...');
    const end = performance.now();

    console.log(`⚡ findByText resolved in: ${end - start}ms`);
    expect(el).toBeTruthy();
  });

  it('Measures waitFor performance', async () => {
    const { getByText } = render(<TodoListScreen />);

    let executionCount = 0;

    const start = performance.now();

    await waitFor(() => {
      executionCount++;
      expect(getByText('Loading...')).toBeTruthy();
    });

    const end = performance.now();

    console.log(`🐌 waitFor resolved in: ${end - start}ms`);
    console.log(`🔁 waitFor callback executions: ${executionCount}`);
  });
});
