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

  const [date, setDate] = useState()
  const [daysWeek, setDaysWeek] = useState(0)
  const [month, setMonth] = useState(0)

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    const currentDate = new Date();

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + month, currentDate.getDate());

    const fullMonth = []

    for (var i = 1; i <= 31; i++) {
      const dateMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + month, i);

      fullMonth.push(dateMonth)
    }

    console.log(fullMonth)

    setDate(date)


  }, [month])


  return (
    <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={styles.container}>

      <View style={styles.setWeek}>
        <TouchableOpacity onPress={() => setMonth(month-1)}>
          <AntDesign name='left' color={colors.gray100} size={20} />
        </TouchableOpacity>

        <Text style={styles.textWeek}>{months[new Date(date).getMonth()]} {new Date(date).getFullYear()}</Text>

        <TouchableOpacity onPress={() => setMonth(month+1)}>
          <AntDesign name='right' color={colors.gray100} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.week}>
        {days.map(item => <View key={item} style={styles.day}><Text style={styles.dayText}>{item}</Text></View>)}
      </View>
      <View style={styles.week}>
        {days.map(item => <View key={item} style={styles.dayContent}></View>)}
      </View>
      <View style={styles.week}>
        {days.map(item => <View key={item} style={styles.dayContent}></View>)}
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

  week: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1
  },

  day: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14%'
  },

  dayText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.secondary,
  },

  dayContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '14%',
    borderWidth: 1,
    borderColor: colors.secondary,
    height: 40,
  },
});
