import React, { createContext, useState, useEffect } from 'react';

export const TodosContext = createContext();

export function TodosProvider({ children }) {

  const [todos, setTodos] = useState([])
  const [dayCheckedHome, setDayCheckedHome] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)

  useEffect(() => {}, [todos])

  return (
    <TodosContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        todos,
        setTodos,
        dayCheckedHome,
        setDayCheckedHome
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}
