import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
// import TodoItem from '../components/TodoItem';

export default function TodoListScreen() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  const removeTask = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <View style={{ padding: 16 }}>
      <Text accessibilityRole="header">Minha ToDo List</Text>

      <TextInput
        placeholder="Digite uma tarefa"
        value={task}
        onChangeText={setTask}
        testID="input-task"
      />

      <Button title="Adicionar" onPress={addTask} />

      {todos.length === 0 && <Text>Nenhuma tarefa ainda</Text>}

      {/* <FlatList
        data={todos}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TodoItem
            title={item}
            onDelete={() => removeTask(index)}
            testID={`todo-${index}`}
          />
        )}
      /> */}
    </View>
  );
}
