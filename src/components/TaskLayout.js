import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {Octicons} from "@expo/vector-icons"
import colors from "../config/colors";

import { useState } from "react";

import ModalTask from "./Modal";
import ModalEdit from "./ModalEdit";

export default function TaskLayout({ id, task, status, description, date }) {

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const taskDate = new Date(date)
  taskDate.setUTCDate(taskDate.getUTCDate() + 1)

  const [viseble, setVisible] = useState(false)
  const [visibleModalEdit, setVisibleModalEdit] = useState(false)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setVisible(true)}
    >
      <ModalTask visible={viseble} status={status} setVisible={setVisible} task={task} description={description} date={date} id={id} />

      <ModalEdit visible={visibleModalEdit} setVisible={setVisibleModalEdit} task={task} description={description} date={date} id={id} />

      <Text style={styles.text}>Task</Text>

      <TouchableOpacity style={styles.editButton} onPress={() => setVisibleModalEdit(true)}>
        <Octicons name="pencil" color={colors.primary} size={20} />
      </TouchableOpacity>

      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
        {task}
      </Text>
      <Text style={styles.date}>{`${days[taskDate.getDay()]} ${taskDate.getDate()} ${months[taskDate.getMonth()]}, ${taskDate.getFullYear()}`}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: '82%',
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 10,
    display: "flex",
    flexDirection: 'column',
    padding: 12,
    marginRight: 8,
    marginLeft: 8,
    marginTop: 8,
    position: 'relative'
  },

  text: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray100,
  },

  date: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray100,
    position: 'absolute',
    bottom: 12,
    left: 12,
  },

  name: {
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 4,
  },

  editButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
