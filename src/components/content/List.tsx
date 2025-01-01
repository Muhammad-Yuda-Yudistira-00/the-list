import { Checkbox, Label } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { RiDeleteBin5Line, RiDragMoveFill } from "react-icons/ri";
import {TaskProps} from "@/types/TaskProps"
import { fetchTasks } from "@/utils/todolist/tasks/fetchTasks";
import deleteTask from "@/utils/todolist/tasks/deleteTask";
import {handleChange} from "@/utils/todolist/tasks/handleChange";
import {handleInput} from "@/utils/todolist/tasks/handleInput";
import {addTask} from "@/utils/todolist/tasks/addTask";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "TASK";

export default function List({code}: {code: string}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [newTask, setNewTask] = useState<TaskProps>({
    id: Date.now(),
    title: "",
    status: "in_progress",
  })

  const tasksRef = useRef<TaskProps[]>(tasks);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

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

const handleDragEnd = (draggedId: number, droppedId: number) => {
    const updatedTasks = [...tasksRef.current];
    const draggedIndex = updatedTasks.findIndex((task) => task.id === draggedId);
    const droppedIndex = updatedTasks.findIndex((task) => task.id === droppedId);

    if (draggedIndex === -1 || droppedIndex === -1) return;

    // Move dragged task to new position
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(droppedIndex, 0, draggedTask);

  setTasks(updatedTasks);
  };

  return (
    <div className="flex max-w-md flex-col gap-4" id="checkbox">

      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          handleDelete={handleDelete}
          handleDragEnd={handleDragEnd}
          API_URL={API_URL}
          API_KEY={API_KEY}
          code={code}
          setTasks={setTasks}
        />
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

function TaskItem({
  task,
  index,
  handleDelete,
  handleDragEnd,
  API_URL,
  API_KEY,
  code,
  setTasks
}: {
  task: TaskProps;
  index: number;
  handleDelete: (taskId: number) => void;
  handleDragEnd: (draggedId: number, droppedId: number) => void;
  API_URL: string;
  API_KEY: string;
  code: string;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (item: { id: number; index: number }) => {
      if (item.index !== index) {
        handleDragEnd(item.id, task.id);
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center gap-2 ${isDragging ? "opacity-50" : ""}`}
    >
      <RiDragMoveFill className="cursor-pointer flex-shrink-0" />
      <RiDeleteBin5Line
        className="text-red-500 cursor-pointer flex-shrink-0"
        onClick={() => handleDelete(task.id)}
      />
      <Checkbox
        checked={task.status === "done"}
        onChange={(e) => handleChange(e, API_URL!, API_KEY!, code, setTasks)}
        data-id={task.id.toString()}
      />
      <Label
        className={`text-gray-300 ${task.status === "done" ? "line-through" : ""}`}
        data-id={task.id.toString()}
        suppressContentEditableWarning
        contentEditable
        onInput={(e) => handleInput(e, API_URL!, API_KEY!, code, setTasks)}
      >
        {task.title}
      </Label>
    </div>
  );
}