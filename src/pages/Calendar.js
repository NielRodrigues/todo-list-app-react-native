import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TodosContext } from '../context/todosContexts';

import colors from '../config/colors';
import Header from '../components/Header';
import DatePicker from "../components/DatePicker"
import CalendarContent from '../components/CalendarContent';

export default function Calendar() {

  const {todos} = useContext(TodosContext)

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.textTop}>Calendar</Text>
      </View>
      <CalendarContent />
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
  top: {
    alignContent: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    marginTop: 16,
    marginBottom: 16,
  },
  textTop: {
    fontSize: 24,
    color: colors.secondary,
    fontWeight: 'bold',
  },
});
