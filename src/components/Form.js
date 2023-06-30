import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView  } from 'react-native';
import colors from '../config/colors';
import { useEffect, useState } from "react";
import {  AntDesign } from "@expo/vector-icons";

export default function Form({add}) {

  const [task, setTask] = useState("")
  const [desc, setDesc] = useState("")

  const [week, setWeek] = useState([])
  const [dayChecked, setDayChecked] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
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

  useEffect(() => {}, [dayChecked])

  const erase = () => {
    setTask("")
    setDesc("")
    setDaysWeek(0)
    setDayChecked(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
  }

  const send = () => {
    add(task, desc, dayChecked)
    erase()
  }

  return (
    <ScrollView
      style={styles.container}
      vertical={true}
      showsVerticalScrollIndicator={false}
    >
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
          value={task}
          onChangeText={(text) => setTask(text)}
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
        <TouchableOpacity style={styles.cancel} onPress={erase}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={send}>
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
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

  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  button: {
    width: '48%',
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: colors.primary,
    color: colors.text,
  },

  cancel: {
    width: '48%',
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: colors.secondary,
    color: colors.text,
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
