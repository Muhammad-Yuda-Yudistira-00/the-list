import { TaskProps } from "@/types/TaskProps";

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
          task.id === newTask.id ? { ...task, id: result.data.id } : task
        )
      );
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error("Error adding new task:", error);
  } finally {
    // Reset task baru
    resetNewTask();
  }
};
