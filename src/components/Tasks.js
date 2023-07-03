import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

import TaskLayout from "./TaskLayout";
import TaskLayout2 from "./TaskLayout2";
import TaskLayout3 from "./TaskLayout3";

import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../context/todosContexts";

import { AntDesign } from "@expo/vector-icons";

export default function TasksHome() {

  const {
    todos,
    dayCheckedTasks,
    setDayCheckedTasks,
    taskOnGoingTasks,
    setTaskOnGoingTasks,
    taskInProgressTasks,
    setTaskInProgressTasks,
    taskDoneTasks,
    setTaskDoneTasks,
   } = useContext(TodosContext)

   useEffect(() => {
    const newTaskOnGoing = todos.filter(item => item.date === dayCheckedTasks && item.status.toLowerCase() === 'to do');
    const newTaskInProgress = todos.filter(item => item.date === dayCheckedTasks && item.status.toLowerCase() === 'in progress');
    const newTaskDone = todos.filter(item => item.date === dayCheckedTasks && item.status.toLowerCase() === 'done');

    setTaskOnGoingTasks(newTaskOnGoing);
    setTaskInProgressTasks(newTaskInProgress);
    setTaskDoneTasks(newTaskDone);
  }, [todos, dayCheckedTasks])

  const [week, setWeek] = useState([])
  const [daysWeek, setDaysWeek] = useState(0)

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    const currentDate = new Date();
    const weekDates = [];

    for (let i = daysWeek; i < daysWeek+7; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
      weekDates.push(date);
    }

    setWeek(weekDates);
  }, [daysWeek])


  return (
    <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={styles.container}>

      <View style={styles.setWeek}>
        <TouchableOpacity onPress={() => setDaysWeek(daysWeek-7)}>
          <AntDesign name='left' color={colors.gray100} size={20} />
        </TouchableOpacity>
        <Text style={styles.textWeek}>{new Date(week[0]).getDate()} {months[new Date(week[0]).getMonth()]} - {new Date(week[6]).getDate()} {months[new Date(week[6]).getMonth()]}</Text>
        <TouchableOpacity onPress={() => setDaysWeek(daysWeek+7)}>
          <AntDesign name='right' color={colors.gray100} size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.weeklyDates} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          week.map((date) => (
            <TouchableOpacity
              key={date.toISOString()}
              style={dayCheckedTasks=== `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.datesCheck : styles.dates }
              onPress={() => setDayCheckedTasks(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)}
            >
              <Text
                style={dayCheckedTasks=== `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.dayCheck : styles.day }
              >{days[date.getDay()]}</Text>
              <Text
                style={dayCheckedTasks=== `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.dateNumberCheck : styles.dateNumber }
              >{String(date.getDate()).padStart(2, '0')}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>

      <View style={styles.tasksSection}>
        <View style={styles.textContent}>
          <Text style={styles.textTaskSection}>To do</Text>
          <View style={styles.viewSpan}>
            <Text style={styles.textSpan}>{taskOnGoingTasks.length}</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.scrollTasks} showsHorizontalScrollIndicator={false}>
          {
            taskOnGoingTasks.map((task, index) => (
              task.date === dayCheckedTasks ?
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
            <Text style={styles.textSpan}>{taskInProgressTasks.length}</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.scrollTasks} showsHorizontalScrollIndicator={false}>
          {
            taskInProgressTasks.map((task, index) => (
              task.date === dayCheckedTasks ?
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
            <Text style={styles.textSpan}>{taskDoneTasks.length}</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={[styles.scrollTasks, {marginBottom: 48}]} showsHorizontalScrollIndicator={false}>
          {
            taskDoneTasks.map((task, index) => (
              task.date === dayCheckedTasks ?
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

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.background,
  },
  weeklyDates: {
    width: '100%',
    height: 64,
    display: 'flex',
    marginBottom: 24,
  },

  dates: {
    width: 42,
    height: '100%',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    marginRight: 16,
  },

  datesCheck: {
    width: 42,
    height: '100%',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.secondary,
    marginRight: 16,
  },

  day: {
    fontSize: 12,
    fontWeight: '100',
    color: colors.secondary,
  },

  dateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  },

  dayCheck: {
    fontSize: 12,
    fontWeight: '100',
    color: colors.background,
  },

  dateNumberCheck: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.background,
  },

  setWeek: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  textWeek: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
