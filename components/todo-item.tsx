import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
  title: string;
  onDelete: () => void;
  id: number;
  testID?: string;
};

export default function TodoItem({ title, onDelete, id }: Props) {
  const router = useRouter();

  return (
    <View
      testID={`todo-${id}`}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
        paddingVertical: 4,
      }}
    >
      <Pressable onPress={() => router.push({ pathname: '/details/[id]', params: { id: String(id) } })}>
        <Text>{title}</Text>
      </Pressable>
      <Pressable
        onPress={onDelete}
        testID={`delete-${id}`}
      >
        <Text style={{ color: 'red' }}>Delete</Text>
      </Pressable>
    </View>
  );
}
