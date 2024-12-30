import { Checkbox, Label } from "flowbite-react";
import { useState, useEffect } from "react";
import { getCursorPosition, setCursorPosition } from "@/utils/CursorPosition";
import { RiDeleteBin5Line } from "react-icons/ri";



type TaskProps = {
  id: number; 
  title: string;
  status: string;
}

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
    const fetchData = async () => {
      try {
        if (!API_KEY) {
          throw new Error("API key is missing");
        }

      const res = await fetch(`${API_URL}/checklist/${code}/task`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      })

      const result = await res.json()

      let data: TaskProps[] = []
      if(result.status && result.statusCode == 200) {
        console.info(result.message)
        data = result.data
      } else {
        console.info(result.message)
      }

      setTasks(data);
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } 
    fetchData()
  }, [code, API_URL, API_KEY])

  const handleInput = async (e: React.FormEvent<HTMLLabelElement>) => {
    const target = e.target as HTMLElement;
    const text = target.innerText.trim();
    const fieldID = target.dataset.id;

    if (!fieldID) {
      console.error("Unknown input id");
      return;
    }

    // Simpan posisi kursor
    const cursorPosition = getCursorPosition();

    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === parseInt(fieldID)
            ? { ...task, title: text } // Perbarui hanya task yang relevan
            : task
        )
      );

      // Kembalikan posisi kursor setelah state diperbarui
      setTimeout(() => {
        if (cursorPosition) setCursorPosition(target, cursorPosition);
      }, 0);

      // Kirim data ke API
      const formData = new FormData();
      formData.append("title", text);

      if (!API_KEY) {
        throw new Error("API key is missing");
      }

      await fetch(`${API_URL}/checklist/${code}/task/${fieldID}`, {
        method: "PATCH",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const taskId = parseInt(e.target.dataset.id || "", 10);

    if (isNaN(taskId)) {
      console.error("Task ID is invalid");
      return;
    }

    try {
      // Update status di state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: isChecked ? "done" : "in_progress" } : task
        )
      );

      // Kirim perubahan ke API
      const formData = new FormData();
      formData.append("status", isChecked ? "done" : "in_progress");

      if (!API_KEY) {
        throw new Error("API key is missing");
      }

      await fetch(`${API_URL}/checklist/${code}/task/${taskId}`, {
        method: "PATCH",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleClick = async () => {
    if (!newTask.title.trim()) return; // Jangan tambahkan task kosong

    try {
      // Tambahkan task baru ke state
      setTasks((prevTasks) => [...prevTasks, newTask]);

      // Kirim ke API
      const formData = new FormData();
      formData.append("title", newTask.title);
      formData.append("status", newTask.status);

      if (!API_KEY) {
        throw new Error("API key is missing");
      }

      const res = await fetch(`${API_URL}/checklist/${code}/task`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      });

      const result = await res.json();
      if (result.status && result.statusCode === 200) {
        console.info(result.message);
        // Perbarui ID dengan ID dari respons API
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === newTask.id
              ? { ...task, id: result.data.id }
              : task
          )
        );
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error adding new task:", error);
    } finally {
      // Reset task baru
      setNewTask({
        id: Date.now(),
        title: "",
        status: "in_progress",
      });
    }
  }

  const handleDelete = async (taskId: number) => {
    try {
      // Hapus task dari state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      // Kirim permintaan DELETE ke API
      if (!API_KEY) {
        throw new Error("API key is missing");
      }

      const res = await fetch(`${API_URL}/checklist/${code}/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      });

      const result = await res.json();

      if (result.status && result.statusCode === 200) {
        console.info("Task deleted successfully:", result.message);
      } else {
        console.error("Failed to delete task:", result.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  return (
    <div className="flex max-w-md flex-col gap-4" id="checkbox">

    {tasks.map(task => (
      <div key={task.id} className="flex items-center gap-2">
        <RiDeleteBin5Line 
          className="text-red-500 cursor-pointer" 
          onClick={() => {
            const confirmDelete = window.confirm("Are you sure you want to delete this task?");
            if (confirmDelete) {
              handleDelete(task.id);
            }
          }}
        />
        <Checkbox checked={task.status == 'done' ? true : false} onChange={handleChange} data-id={task.id.toString()} />
        <Label className={`text-gray-300 ${task.status == 'done' ? 'line-through' : ''}`} data-id={task.id.toString()} suppressContentEditableWarning contentEditable onInput={handleInput} >{task.title}</Label>
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
        onClick={handleClick}
      >
        Add
      </button>
    </div>

    </div>
  );
}
