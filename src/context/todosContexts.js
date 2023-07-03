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

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {}, [todos, dayCheckedHome])

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
      }}
    >



      {children}
    </TodosContext.Provider>
  )
}
