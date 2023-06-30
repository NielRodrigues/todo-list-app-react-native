import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TodosContext } from '../context/todosContexts';
import { useContext, useEffect } from 'react';

export default function Chat() {

  const { todos } = useContext(TodosContext)

  useEffect(() => {}, [todos])

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(todos)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
