import React from 'react';
import { Button, Text, View } from 'react-native';

type Props = {
  title: string;
  onDelete: () => void;
  testID?: string;
};

export default function TodoItem({ title, onDelete, testID }: Props) {
  return (
    <View
      testID={testID}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
        paddingVertical: 4,
      }}
    >
      <Text>{title}</Text>
      <Button title="Remove" onPress={onDelete} />
    </View>
  );
}
