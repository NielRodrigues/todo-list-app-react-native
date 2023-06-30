import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TodosContext } from '../context/todosContexts';

import colors from '../config/colors';
import Header from '../components/Header';
import DatePicker from "../components/DatePicker"
import TasksHome from '../components/TasksHome';

export default function Home() {

  const {todos} = useContext(TodosContext)

  return (
    <View style={styles.container}>
      <Header />
      <DatePicker />
      <TasksHome />
      <StatusBar style="auto" />
    </View>
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
});
