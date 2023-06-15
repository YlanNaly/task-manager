import React, { ChangeEvent, use, useEffect, useRef, useState } from 'react';
import { useTaskManager } from '@/store/useTaskManager';
import { useLocalStorage } from '@/hooks/useLocalStorage';
interface Task {
  id: number,
  text: string,
  completed: boolean,
}

const TaskManager = () => {
   const {
     tasks,
     addTasks,
     removeTask,
     updateTask,
      searchTasks
   } = useTaskManager();

  const handleAddTask = () => {
    const title = "nouveau" ; // Replace with the value in the createTaskRef 
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {setValue} = useLocalStorage("task", newTask)
    setValue(newTask)
    addTasks(newTask)
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    return updateTask(taskId , updatedTask.text);
  };

  const handleDeleteTask = (taskId: number) => {
    return removeTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    return searchTasks(e.currentTarget.value)
  };

  useEffect(() => {
    const storedItem = localStorage.getItem('task');

    if (storedItem) {
      addTasks(storedItem)
    }
  }, [addTasks]);
  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" /*ref={}*//>

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.text}
              onChange={(e) =>
                handleUpdateTask(task.id, {
                  text: e.target.value.toString(),
                  id: 0,
                  completed: false
                })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
