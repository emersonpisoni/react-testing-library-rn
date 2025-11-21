import { fakeApiWithFetch } from '@/api/fake-api';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, TextInput, View } from 'react-native';
import TodoItem from '../../components/todo-item';

type Todo = { id: number; title: string };

export default function Tab() {
  const [task, setTask] = useState<Todo>({ id: 0, title: '' });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fakeApiWithFetch();
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();

        setTodos(data);
        setTask({ id: data.length + 1, title: '' });
      } catch {
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
  }

  function clearTasks() {
    setTodos([]);
  }

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
        <Button title="Retry" onPress={() => setError(null)} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text accessibilityRole="header">Todo List</Text>
      <TextInput
        placeholder="Type a task"
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
        testID="input-task"
      />
      <Button title="Add" onPress={addTask} />
      <Button title="Clear all" onPress={clearTasks} />
      {!todos.length && <Text>No tasks</Text>}
      <FlatList
        data={todos}
        keyExtractor={(t) => t.id.toString()}
        renderItem={({ item, index }) => (
          <TodoItem title={item.title} onDelete={() => removeTask(index)} id={index + 1} />
        )}
      />
    </View>
  );
}
