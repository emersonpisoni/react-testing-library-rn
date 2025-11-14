// import { act, renderHook } from '@testing-library/react-hooks';
// import { useTodos } from '../hooks/use-todos';

// const mockData = [
//   { id: 1, title: 'Learn React Native' },
//   { id: 2, title: 'Build a Todo App' },
// ];

// const mockResponse = new Response(JSON.stringify(mockData), {
//   status: 200,
//   statusText: 'OK',
// });

// jest.spyOn(global, 'fetch').mockImplementation(() =>
//   Promise.resolve(mockResponse) as any
// );

// describe('useTodos hook', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('loads todos successfully', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useTodos());

//     // Estado inicial
//     expect(result.current.loading).toBe(true);
//     expect(result.current.todos).toEqual([]);

//     // Espera o fetch terminar
//     await waitForNextUpdate();

//     // Estado final
//     expect(result.current.loading).toBe(false);
//     expect(result.current.todos).toEqual(mockData);
//     expect(result.current.error).toBeNull();
//   });

//   it('handles fetch error', async () => {
//     // mocka erro
//     (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

//     const { result, waitForNextUpdate } = renderHook(() => useTodos());

//     await waitForNextUpdate();

//     expect(result.current.error).toBe('Failed to load tasks');
//     expect(result.current.todos).toEqual([]);
//   });

//   it('refetch works correctly', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useTodos());

//     await waitForNextUpdate();

//     expect(result.current.todos).toHaveLength(2);

//     // Força uma atualização (refetch)
//     await act(async () => {
//       await result.current.refetch();
//     });

//     expect(result.current.todos).toHaveLength(2);
//     expect(result.current.loading).toBe(false);
//   });
// });
