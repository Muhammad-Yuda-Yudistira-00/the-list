import {TaskProps} from "@/types/TaskProps"

const deleteTask = async (taskId: number, setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>, API_URL: string, API_KEY: string, code: string) => {
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

  export default deleteTask