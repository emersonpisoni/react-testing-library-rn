import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import TodoItem from '../components/todo-item';

export default function TodoListScreen() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  function addTask() {
    if (task.trim() !== '') {
      setTodos((prev) => [...prev, task]);
      setTask('');
    }
  };

  function removeTask(index: number) {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text accessibilityRole="header" style={{ fontSize: 20, fontWeight: 'bold' }}>
        Todo List
      </Text>
      <TextInput
        placeholder="Type a task"
        value={task}
        onChangeText={setTask}
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
        // keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TodoItem
            title={item}
            onDelete={() => removeTask(index)}
            testID={`todo-${index}`}
          />
        )}
      />
    </View>
  );
}
