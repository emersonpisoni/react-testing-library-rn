import { fakeApiWithFetch } from '@/api/fake-api';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, TextInput, View } from 'react-native';
import TodoItem from '../components/todo-item';

type Todo = { id: number; title: string };

export default function TodoListScreen() {
  const [task, setTask] = useState<Todo>({ id: 0, title: '' });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        console.log('Fetching todos from API...');
        const response = await fakeApiWithFetch();
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();

        console.log('Fetched todos:', data);

        setTodos(data);
        setTask({ id: data.length + 1, title: '' });
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  const addTask = useCallback(() => {
    if (task.title.trim() !== '') {
      setTodos((prev) => [...prev, task]);
      setTask({ id: todos.length + 2, title: '' });
    }
  }, [task, todos.length]);

  function removeTask(index: number) {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text accessibilityRole="header" style={{ fontSize: 20, fontWeight: 'bold' }}>
        Todo List
      </Text>
      <TextInput
        placeholder="Type a task"
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
        testID="input-task"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginVertical: 8,
          borderRadius: 4,
        }}
      />
      <Button title="Add" onPress={addTask} />
      {!todos.length && <Text>No tasks</Text>}
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <TodoItem
            title={item.title}
            onDelete={() => removeTask(index)}
            testID={`todo-${index}`}
            id={index + 1}
          />
        )}
      />
    </View>
  );
}
