import { Checkbox, Label } from "flowbite-react";
import { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import {TaskProps} from "@/types/TaskProps"
import { fetchTasks } from "@/utils/todolist/tasks/fetchTasks";
import deleteTask from "@/utils/todolist/tasks/deleteTask";
import {handleChange} from "@/utils/todolist/tasks/handleChange";
import {handleInput} from "@/utils/todolist/tasks/handleInput";
import {addTask} from "@/utils/todolist/tasks/addTask";


export default function List({code}: {code: string}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [newTask, setNewTask] = useState<TaskProps>({
    id: Date.now(),
    title: "",
    status: "in_progress",
  })

  useEffect(() => {
    (async () => {
      const data = await fetchTasks(API_URL!, API_KEY!, code);
      setTasks(data);
    })();
  }, [code, API_URL, API_KEY]);


  const resetNewTask = () => {
    setNewTask({
      id: Date.now(),
      title: "",
      status: "in_progress",
    });
  };


const handleDelete = (taskId: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    deleteTask(taskId, setTasks, API_URL!, API_KEY!, code);
  }
} 

  return (
    <div className="flex max-w-md flex-col gap-4" id="checkbox">

    {tasks.map(task => (
      <div key={task.id} className="flex items-center gap-2">
        <RiDeleteBin5Line 
          className="text-red-500 cursor-pointer" 
          onClick={() => handleDelete(task.id)}
        />
        <Checkbox checked={task.status == 'done' ? true : false} onChange={(e) => handleChange(e, API_URL!, API_KEY!, code, setTasks)} data-id={task.id.toString()} />
        <Label className={`text-gray-300 ${task.status == 'done' ? 'line-through' : ''}`} data-id={task.id.toString()} suppressContentEditableWarning contentEditable onInput={(e) => handleInput(e, API_URL!, API_KEY!, code, setTasks)} >{task.title}</Label>
      </div>
      ))}

    {/* Input untuk task baru */}
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="border rounded p-2 w-full text-gray-700"
        placeholder="Add new task..."
        value={newTask.title}
        onChange={(e) =>
          setNewTask({ ...newTask, title: e.target.value })
        }
      />
      <button
        className="bg-blue-500 text-white rounded px-4 py-2"
        onClick={() =>
                  addTask(newTask, setTasks, API_URL!, API_KEY!, code, resetNewTask)
                }
      >
        Add
      </button>
    </div>

    </div>
  );
}
