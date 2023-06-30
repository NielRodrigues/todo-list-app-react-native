import { View, StyleSheet, ScrollView, Text } from "react-native";
import colors from "../config/colors";

import TaskLayout from "./TaskLayout";
import TaskLayout2 from "./TaskLayout2";
import { useContext, useEffect } from "react";
import { TodosContext } from "../context/todosContexts";

export default function TasksHome() {

  const { todos, dayCheckedHome } = useContext(TodosContext)
  useEffect(() => {}, [todos, dayCheckedHome])

  return (
    <ScrollView vertical={true} style={styles.container}>
      <View style={styles.tasksSection}>
        <View style={styles.textContent}>
          <Text style={styles.textTaskSection}>To do</Text>
          <View style={styles.viewSpan}>
            <Text style={styles.textSpan}>6</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.scrollTasks} showsHorizontalScrollIndicator={false}>
          {
            todos.map((task, index) => (
              task.date === dayCheckedHome ?
              (
                index % 2 === 0 ?
                <TaskLayout key={task.id} task={task.task} date={task.date} />
                :
                <TaskLayout2 key={task.id} task={task.task} date={task.date} />
              )
              : null
            ))
          }
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '80%',
  },

  tasksSection: {
    width: '100%',
    marginTop: 24,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column',
  },

  textContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  textTaskSection: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
  },

  viewSpan: {
    width: 18,
    height: 28,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginLeft: 12,
  },

  textSpan: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },

  scrollTasks: {
    marginTop: 12,
    width: '100%',
    height: 148,
    display: 'flex',
    flexDirection: 'row',
  },
});
