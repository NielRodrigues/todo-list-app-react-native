import { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Pressable, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons"

import { TodosContext } from "../context/todosContexts";
import { useContext } from "react";

import colors from "../config/colors";

export default function ModalEdit({visible, setVisible, task, description, date, id}) {

  const { todos, setTodos } = useContext(TodosContext)

  const [taskEdit, setTaskEdit] = useState()
  const [desc, setDesc] = useState()
  const [dayChecked, setDayChecked] = useState(date)

  useEffect(() => {
    setTaskEdit(task)
    setDesc(description)
    setDayChecked(date)
  }, [visible])

  const [week, setWeek] = useState([])
  const [daysWeek, setDaysWeek] = useState(0)

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const taskDate = new Date(date)
  taskDate.setUTCDate(taskDate.getUTCDate() + 1)

  useEffect(() => {
    const currentDate = new Date();
    const weekDates = [];

    for (let i = daysWeek; i < daysWeek+7; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
      weekDates.push(date);
    }

    setWeek(weekDates);
  }, [daysWeek])

  useEffect(() => {}, [dayChecked])

  const updateTask = () => {
    setTodos(
      todos.map((obj) => obj.id === id ?
      {
        ...obj,
        task: taskEdit,
        description: desc,
        date: dayChecked
      } : obj)
    )
  }

  const removeTask = () => {
    setTodos(todos.filter((obj) => obj.id !== id));
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <Pressable
            style={styles.buttonTop}
            onPress={() => setVisible(false)}
          >
            <AntDesign name="arrowleft" color={colors.secondary} size={24} />
          </Pressable>
          <Text style={styles.textTop}>Task edit</Text>

          <TouchableOpacity
            style={styles.buttonTop}
            onPress={() => removeTask()}
          >
            <Feather name="trash-2" color={colors.secondary} size={24} />
          </TouchableOpacity>
        </View>

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
                style={dayChecked === `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.datesCheck : styles.dates }
                onPress={() => setDayChecked(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)}
              >
                <Text
                  style={dayChecked === `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.dayCheck : styles.day }
                >{days[date.getDay()]}</Text>
                <Text
                  style={dayChecked === `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.dateNumberCheck : styles.dateNumber }
                >{String(date.getDate()).padStart(2, '0')}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>

        <View style={styles.field}>
          <Text style={styles.textField}>Task name</Text>
          <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor={colors.gray100}
            value={taskEdit}
            onChangeText={(text) => setTaskEdit(text)}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.textField}>Task description</Text>
          <TextInput
            style={styles.input}
            placeholder='Description'
            placeholderTextColor={colors.gray100}
            value={desc}
            onChangeText={(text) => setDesc(text)}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.primary}]}
            onPress={() => updateTask()}
          >
            <Text style={styles.textButton}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 9999,
    backgroundColor: colors.background,
    position: 'relative',
    paddingRight: 12,
    paddingLeft: 12,
  },

  buttonTop: {
    width: 28,
    height: 28,
  },

  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  textTop: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray200
  },


  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 24,
    width: '100%',
    marginLeft: 12
  },

  button: {
    height: 48,
    width: '48%',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary
  },

  textButton: {
    fontSize: 14,
    color: colors.text
  },

  field: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: 16,
  },

  textField: {
    fontSize: 12,
    color: colors.gray100,
    margin: 0,
    marginLeft: 12,
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#ececec',
    height: 48,
    marginTop: 2,
    color: 'black',
    paddingLeft: 8,
    fontSize: 16,
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
    maxHeight: 64
  },

  dates: {
    width: 42,
    height: 64,
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
    height: 64,
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
    marginTop: 32,
    marginBottom: 16,
  },

  textWeek: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
