import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Todo Detail</Text>
      <Text>Task ID: {id}</Text>

      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
