import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import colors from '../config/colors';
import Form from '../components/Form';
import { useContext } from 'react';
import { TodosContext } from '../context/todosContexts';


export default function Add() {

  const {todos, setTodos} = useContext(TodosContext)

  const add = (name, desc, date) => {
    setTodos([
      ...todos, {
        id: new Date().getTime(),
        task: name,
        description: desc,
        date: date,
        status: 'to do'
      }
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.textTop}>Create new task</Text>
      </View>
      <Form add={add} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    alignItems: 'center',
    padding: 24,
  },

  top: {
    alignContent: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    marginTop: 32,
  },

  textTop: {
    fontSize: 24,
    color: colors.secondary,
    fontWeight: 'bold',
  },
});
