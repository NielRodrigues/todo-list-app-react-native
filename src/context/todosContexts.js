import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';


export const TodosContext = createContext();

export function TodosProvider({ children }) {

  const [todos, setTodos] = useState([])
  const [dayCheckedHome, setDayCheckedHome] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
  const [dayCheckedTasks, setDayCheckedTasks] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
  const [taskOnGoing, setTaskOnGoing] = useState([])
  const [taskInProgress, setTaskInProgress] = useState([])
  const [taskDone, setTaskDone] = useState([])

  const [taskOnGoingTasks, setTaskOnGoingTasks] = useState([])
  const [taskInProgressTasks, setTaskInProgressTasks] = useState([])
  const [taskDoneTasks, setTaskDoneTasks] = useState([])

  const [name, setName] = useState("Name")

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {}, [todos, dayCheckedHome])

  useEffect(() => {
    async function fetchData() {
      if (!(await AsyncStorage.getItem('name'))) {
        await AsyncStorage.setItem('name', 'Name');
        setName('Name');
      }
      setName(await AsyncStorage.getItem('name'));

      if (!(await AsyncStorage.getItem('todos'))) {
        await AsyncStorage.setItem('todos', JSON.stringify([]));
      }
      setTodos(JSON.parse(await AsyncStorage.getItem('todos')));

      console.log('\n\n\nName', await AsyncStorage.getItem('name'));
    }

    fetchData();
  }, [])

  useEffect(() => {
    async function changeName() {
      await AsyncStorage.setItem('name', name)
    }
    changeName()
  }, [name])


  useEffect(() => {
    async function updateTodos() {
      await AsyncStorage.setItem('todos', JSON.stringify(todos))
    }
    updateTodos
  }, [todos])


  return (
    <TodosContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        todos,
        setTodos,
        dayCheckedHome,
        setDayCheckedHome,
        taskOnGoing,
        setTaskOnGoing,
        taskInProgress,
        setTaskInProgress,
        taskDone,
        setTaskDone,

        taskOnGoingTasks,
        setTaskOnGoingTasks,
        taskInProgressTasks,
        setTaskInProgressTasks,
        taskDoneTasks,
        setTaskDoneTasks,

        quantity,
        setQuantity,
        dayCheckedTasks,
        setDayCheckedTasks,

        name,
        setName
      }}
    >



      {children}
    </TodosContext.Provider>
  )
}
