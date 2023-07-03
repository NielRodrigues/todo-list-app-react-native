import { View, StyleSheet, ScrollView, Text } from "react-native";
import colors from "../config/colors";

import TaskLayout from "./TaskLayout";
import TaskLayout2 from "./TaskLayout2";
import TaskLayout3 from "./TaskLayout3";

import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../context/todosContexts";

export default function Tasks() {

  const {
    todos,
    dayCheckedHome,
    taskOnGoing,
    setTaskOnGoing,
    taskInProgress,
    setTaskInProgress,
    taskDone,
    setTaskDone,
    quantity,
    setQuantity
   } = useContext(TodosContext)

   useEffect(() => {
    const newTaskOnGoing = todos.filter(item => item.date === dayCheckedHome && item.status.toLowerCase() === 'to do');
    const newTaskInProgress = todos.filter(item => item.date === dayCheckedHome && item.status.toLowerCase() === 'in progress');
    const newTaskDone = todos.filter(item => item.date === dayCheckedHome && item.status.toLowerCase() === 'done');

    setTaskOnGoing(newTaskOnGoing);
    setTaskInProgress(newTaskInProgress);
    setTaskDone(newTaskDone);

    setQuantity(newTaskOnGoing.length + newTaskInProgress.length + newTaskDone.length);
  }, [todos, dayCheckedHome])


  return (
    <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.tasksSection}>
        <View style={styles.textContent}>
          <Text style={styles.textTaskSection}>To do</Text>
          <View style={styles.viewSpan}>
            <Text style={styles.textSpan}>{taskOnGoing.length}</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.scrollTasks} showsHorizontalScrollIndicator={false}>
          {
            taskOnGoing.map((task, index) => (
              task.date === dayCheckedHome ?
              (
                index % 2 === 0 ?
                <TaskLayout key={task.id} status={task.status} id={task.id} task={task.task} description={task.description} date={task.date} />
                :
                <TaskLayout2 key={task.id} status={task.status} id={task.id} task={task.task} description={task.description} date={task.date} />
              )
              : null
            ))
          }
        </ScrollView>

        <View style={styles.textContent}>
          <Text style={styles.textTaskSection}>In progress</Text>
          <View style={styles.viewSpan}>
            <Text style={styles.textSpan}>{taskInProgress.length}</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.scrollTasks} showsHorizontalScrollIndicator={false}>
          {
            taskInProgress.map((task, index) => (
              task.date === dayCheckedHome ?
              (
                index % 2 === 0 ?
                <TaskLayout3 key={task.id} status={task.status} id={task.id} task={task.task} description={task.description} date={task.date} />
                :
                <TaskLayout key={task.id} status={task.status} id={task.id} task={task.task} description={task.description} date={task.date} />
              )
              : null
            ))
          }
        </ScrollView>

        <View style={styles.textContent}>
          <Text style={styles.textTaskSection}>Done</Text>
          <View style={styles.viewSpan}>
            <Text style={styles.textSpan}>{taskDone.length}</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={[styles.scrollTasks, {marginBottom: 48}]} showsHorizontalScrollIndicator={false}>
          {
            taskDone.map((task, index) => (
              task.date === dayCheckedHome ?
              (
                index % 2 === 0 ?
                <TaskLayout2 key={task.id} status={task.status} id={task.id} task={task.task} description={task.description} date={task.date} />
                :
                <TaskLayout3 key={task.id} status={task.status} id={task.id} task={task.task} description={task.description} date={task.date} />
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
