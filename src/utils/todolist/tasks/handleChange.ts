import { TaskProps } from "@/types/TaskProps";

export const handleChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  API_URL: string,
  API_KEY: string,
  code: string,
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>
) => {
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
