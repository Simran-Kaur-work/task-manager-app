import React, { createContext, useState, useEffect } from 'react';

export const TableContext = createContext();

const ContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from local storage when the component mounts
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks((prevTasks) => [...prevTasks, task]);
  const updateTask = (task) => setTasks((prevTasks) =>
    prevTasks.map(t => (t.id === task.id ? task : t))
  );
  const deleteTask = (id) => setTasks((prevTasks) => prevTasks.filter(t => t.id !== id));

  return (
    <TableContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TableContext.Provider>
  );
};

export default ContextProvider;
