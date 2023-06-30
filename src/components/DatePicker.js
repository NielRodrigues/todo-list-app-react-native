import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import user from "../../assets/user.png"
import colors from "../config/colors";
import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../context/todosContexts";


export default function DatePicker() {

  const { dayCheckedHome, setDayCheckedHome } = useContext(TodosContext)

  const [week, setWeek] = useState([])

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  useEffect(() => {
    const currentDate = new Date();
    const weekDates = [];

    for (let i = -1; i < 6; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
      weekDates.push(date);
    }

    setWeek(weekDates);
  }, [])

  useEffect(() => {}, [dayCheckedHome])

  return (
    <View style={styles.container}>
      <Text style={styles.textTop}>You've got <Text style={styles.textSpan}>6</Text> tasks today</Text>
      <ScrollView style={styles.weeklyDates} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          week.map((date) => (
            <TouchableOpacity
              key={date.toISOString()}
              style={dayCheckedHome === `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.datesCheck : styles.dates }
              onPress={() => setDayCheckedHome(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)}
            >
              <Text
                style={dayCheckedHome === `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.dayCheck : styles.day }
              >{days[date.getDay()]}</Text>
              <Text
                style={dayCheckedHome === `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? styles.dateNumberCheck : styles.dateNumber }
              >{String(date.getDate()).padStart(2, '0')}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 12,
  },

  textTop: {
    fontSize: 22,
    fontWeight:'700',
    color: colors.secondary,
  },

  textSpan: {
    fontWeight:'bold',
    color: colors.primary,
  },

  weeklyDates: {
    width: '100%',
    height: 64,
    display: 'flex',
    marginTop: 24,
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
    fontWeight: '400',
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

});
