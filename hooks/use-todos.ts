import { useEffect, useState } from 'react';

type Todo = { id: number; title: string };

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchTodos() {
    try {
      setLoading(true);
      const response = await fakeApiWithFetch();
      const data = await response.json();
      setTodos(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, refetch: fetchTodos };
}

function fakeApiWithFetch(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Build a Todo App' },
      ];
      const init = { status: 200, statusText: 'OK' };
      resolve(new Response(JSON.stringify(data), init));
    }, 1000);
  });
}
