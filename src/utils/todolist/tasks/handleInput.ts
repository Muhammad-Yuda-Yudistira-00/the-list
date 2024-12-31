import { getCursorPosition, setCursorPosition } from "@/utils/todolist/CursorPosition";
import { TaskProps } from "@/types/TaskProps";

export const handleInput = async (
  e: React.FormEvent<HTMLLabelElement>,
  API_URL: string,
  API_KEY: string,
  code: string,
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>
) => {
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
    // Update state task
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === parseInt(fieldID)
          ? { ...task, title: text }
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
