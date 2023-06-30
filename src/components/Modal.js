import { useContext, useEffect, useState } from "react";
import { Modal, View, StyleSheet, Pressable, Text, TouchableOpacity } from "react-native";
import { AntDesign, Octicons, Ionicons } from "@expo/vector-icons"

import colors from "../config/colors";
import { Touchable } from "react-native";
import ModalEdit from "./ModalEdit";

import { TodosContext } from '../context/todosContexts';

export default function ModalTask({visible, setVisible, task, description, date, id, status}) {


  const { todos, setTodos } = useContext(TodosContext)

  useEffect(() => {}, [visible])

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const taskDate = new Date(date)
  taskDate.setUTCDate(taskDate.getUTCDate() + 1)

  const [visibleModalEdit, setVisibleModalEdit] = useState(false)

  const openModal = () => {
    setVisibleModalEdit(true)
  }

  const editStatus = (newStatus) => {
    setTodos(
      todos.map((obj) => obj.id === id ? {...obj, status: newStatus} : obj)
    )
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <ModalEdit visible={visibleModalEdit} setVisible={setVisibleModalEdit} task={task} description={description} date={date} id={id} />
      <View style={styles.container}>
        <View style={styles.top}>
          <Pressable
            style={styles.buttonTop}
            onPress={() => setVisible(false)}
          >
            <AntDesign name="arrowleft" color={colors.secondary} size={24} />
          </Pressable>
          <Text style={styles.textTop}>Task detail</Text>

          <TouchableOpacity
            style={styles.buttonTop}
            onPress={() => openModal()}
          >
            <Octicons name="pencil" color={colors.secondary} size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{task}</Text>

        <View style={styles.dateSection}>
          <View style={styles.calendarIcon}>
            <Ionicons name="calendar" color={colors.primary} size={20} />
          </View>
          <View style={styles.textDateContent}>
            <Text style={styles.deadline}>Deadline</Text>
            <Text style={styles.date}>{`${days[taskDate.getDay()]} ${taskDate.getDate()}, ${months[taskDate.getMonth()]}`}</Text>
          </View>
        </View>

        <Text style={styles.descTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>

        {
          status.toLowerCase() === 'to do' ?
          (
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={() => editStatus('done')}>
                <Text style={styles.textButton}>Done</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary}]} onPress={() => editStatus('in progress')}>
                <Text style={styles.textButton}>In progress</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }

        {
          status.toLowerCase() === 'in progress' ?
          (
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={() => editStatus('done')}>
                <Text style={styles.textButton}>Done</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary}]} onPress={() => editStatus('to do')}>
                <Text style={styles.textButton}>To do</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }

        {
          status.toLowerCase() === 'done' ?
          (
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={() => editStatus('in progress')}>
                <Text style={styles.textButton}>In progress</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary}]} onPress={() => editStatus('to do')}>
                <Text style={styles.textButton}>To do</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
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

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 32,
  },

  dateSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },

  calendarIcon: {
    height: 32,
    width: 32,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  textDateContent: {
    display: 'flex',
    flexDirection: 'column',
  },

  deadline: {
    fontSize: 12,
    fontWeight: '100',
    color: colors.gray200,
  },

  date: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },

  descTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 24,
  },

  description: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray100,
    marginTop: 8,
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



});
