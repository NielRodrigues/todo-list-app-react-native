import { View, StyleSheet, Image, Text } from "react-native";
import user from "../../assets/user.png"
import colors from "../config/colors";
import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../context/todosContexts";

export default function Header() {

  const { name } = useContext(TodosContext)

  const [saud, setSaud] = useState()
  const hours = new Date()

  useEffect(() => {
    if(hours.getHours() > 5) setSaud("Good Morning")
    if(hours.getHours() > 12) setSaud("Good Afternoon")
    if(hours.getHours() > 18 || hours.getHours() <= 5) setSaud("Good Evening")
  }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.user_picture} source={user} />
      <View style={styles.textContent}>
        <Text style={styles.saud}>{saud}</Text>
        <Text style={styles.name}>{name}!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 12,
  },

  user_picture: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },

  textContent: {
    display: 'flex',
    flexDirection: 'column',
  },

  saud: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '100',
    margin: 0,
    marginBottom: -4,
  },

  name: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 0,
  },
});
