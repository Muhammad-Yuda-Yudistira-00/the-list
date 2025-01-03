import { useState, useEffect, useRef } from "react";
import {TaskProps} from "@/types/TaskProps"
import { fetchTasks } from "@/utils/todolist/tasks/fetchTasks";
import deleteTask from "@/utils/todolist/tasks/deleteTask";
import {addTask} from "@/utils/todolist/tasks/addTask";
import { cherryCreamSoda } from "@/libs/googleFonts/fontsStyle"
import TaskItem from "@/components/content/TaskItem"

export default function List({code}: {code: string}) {
  const API_URL: string = process.env.NEXT_PUBLIC_API_URL || ''
  const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY || ''
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

// const handleDragEnd = (draggedId: number, droppedId: number) => {
//     const updatedTasks = [...tasksRef.current];
//     const draggedIndex = updatedTasks.findIndex((task) => task.id === draggedId);
//     const droppedIndex = updatedTasks.findIndex((task) => task.id === droppedId);

//     if (draggedIndex === -1 || droppedIndex === -1) return;

//     // Move dragged task to new position
//     const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
//     updatedTasks.splice(droppedIndex, 0, draggedTask);

//   setTasks(updatedTasks);
//   };
const handleDragEnd = async (draggedId: number, droppedId: number) => {
  const updatedTasks = [...tasksRef.current];

  // Temukan indeks untuk draggedId dan droppedId
  const draggedIndex = updatedTasks.findIndex((task) => task.id === draggedId);
  const droppedIndex = updatedTasks.findIndex((task) => task.id === droppedId);

  // Validasi indeks
  if (draggedIndex === -1 || droppedIndex === -1) {
    console.error("Invalid drag or drop index.");
    return;
  }

  // Pindahkan tugas yang diseret ke posisi baru
  const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
  if (!draggedTask) {
    console.error("Dragged task not found.");
    return;
  }
  updatedTasks.splice(droppedIndex, 0, draggedTask);

  setTasks(updatedTasks); // Perbarui state lokal untuk feedback UI

  try {
    // Kirim permintaan untuk memperbarui urutan tugas
    const requests = updatedTasks.map((task, index) => {
      const formData = new FormData();
      formData.append("order", (index + 1).toString());

      return fetch(`${API_URL}/checklist/${code}/task/${task.id}`, {
        method: "PUT",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      });
    });

    // Tunggu semua permintaan selesai
    const responses = await Promise.all(requests);

    // Periksa hasil respons
    const allSuccessful = responses.every((res) => res.ok);

    if (allSuccessful) {
      console.info("Tasks reordered successfully.");
      const refreshedTasks = await fetchTasks(API_URL, API_KEY, code); // Sinkronisasi ulang
      setTasks(refreshedTasks);
    } else {
      console.error("Failed to reorder some tasks.");
    }
  } catch (error) {
    console.error("Error during task reordering:", error);
  }
};




  return (
    <div className="flex max-w-2xl flex-col gap-4" id="checkbox">

      <div className="max-h-96 overflow-y-scroll px-8 pb-8 bg-gradient-to-b from-blue-700/20 to-blue-500">
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
      </div>

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
          className={`bg-white hover:bg-white text-blue-500 uppercase rounded px-4 py-2 ${cherryCreamSoda.className}`}
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