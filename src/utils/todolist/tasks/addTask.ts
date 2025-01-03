import { TaskProps } from "@/types/TaskProps";
import { fetchTasks } from "@/utils/todolist/tasks/fetchTasks";

export const addTask = async (
  newTask: TaskProps,
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>,
  API_URL: string,
  API_KEY: string,
  code: string,
  resetNewTask: () => void
) => {
  if (!newTask.title.trim()) return; // Jangan tambahkan task kosong

  try {
    // Kirim tugas baru ke API
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

      // Ambil ulang daftar tugas dari server
      const updatedTasks = await fetchTasks(API_URL, API_KEY, code);
      console.log("Updated tasks from API:", updatedTasks); // Debugging
      setTasks(updatedTasks);
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error("Error adding new task:", error);
  } finally {
    // Reset input task baru
    resetNewTask();
  }
};
