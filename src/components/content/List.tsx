import { Checkbox, Label } from "flowbite-react";
import { useState, useEffect } from "react";
import { getCursorPosition, setCursorPosition } from "@/utils/CursorPosition";

type TaskProps = {
  id: number; 
  title: string;
  status: string;
}

export default function List({code}: {code: string}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const [tasks, setTasks] = useState<TaskProps[]>([])

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
  
  return (
    <div className="flex max-w-md flex-col gap-4" id="checkbox">
    {tasks.map(task => (
      <div key={task.id} className="flex items-center gap-2">
        <Checkbox checked={task.status == 'done' ? true : false} onChange={handleChange} data-id={task.id.toString()} />
        <Label className="text-gray-300" data-id={task.id.toString()} suppressContentEditableWarning contentEditable onInput={handleInput} >{task.title}</Label>
      </div>
      ))}
    </div>
  );
}
