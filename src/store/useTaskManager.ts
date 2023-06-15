import { create } from 'zustand'

type Tasks = {
  id:number;
  text: string;
  completed: boolean
}
type TaskRef = {
  taskId: number;
  ref: React.RefObject<HTMLLIElement> | null;
};

type Store = {
  tasks: Tasks[];
  taskRefs: TaskRef[];
  addTasks: (query:any) => void;
  removeTask: (id:any) => void;
  setTasks: (tasks: Tasks[]) => void;
  searchTasks: (id:any)=> void;
  updateTask: (id: number, newText: string) => void;
};

const useTaskManager = create<Store>((set)=> ({
  tasks: [],
  taskRefs: [],
  addTasks: (text: any) => {
    const taskId = Date.now();
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: taskId,
          text,
          completed: false,
        },
      ],
      taskRefs: [
        ...state.taskRefs,
        {
          taskId,
          ref: null,
        },
      ],
    }));
  },
  searchTasks: (query:any) => {
    return query.tasks.filter((task:any) =>
      task.text.toLowerCase().includes(query.toLowerCase())
    );
  },
  removeTask: (id:any) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  updateTask: (id, newText) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      ),
    }));
  },
  setTasks: (tasks) => {
    set(() => ({
      tasks,
    }));
}}))

export {
  useTaskManager
}