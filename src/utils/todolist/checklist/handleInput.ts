import { getCursorPosition, setCursorPosition } from "@/utils/todolist/CursorPosition";
import ChecklistProps from "@/types/ChecklistProps"


const handleInput = async (e: React.FormEvent<HTMLDivElement>, setChecklist: React.Dispatch<React.SetStateAction<ChecklistProps>>) => {
  const target = e.target as HTMLElement; // Definisikan target
  const text = target.innerText.trim();
  const fieldType = target.dataset.type;

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY

  if (!fieldType) {
    console.error("Unknown input type");
    return;
  }

  // Simpan posisi kursor
  const cursorPosition = getCursorPosition();

  try {
    setChecklist((prevChecklist) => {
      const updatedChecklist = {
        ...prevChecklist,
        [fieldType]: text,
      };

      // Kembalikan posisi kursor setelah state diperbarui
      setTimeout(() => {
        if (cursorPosition) setCursorPosition(target, cursorPosition);
      }, 0);

      // Kirim data ke API
      const formData = new FormData();
      formData.append(fieldType, text);

      if (!API_KEY) {
        throw new Error("API key is missing");
      }

      fetch(`${API_URL}/checklist/${prevChecklist.id}`, {
        method: "PATCH",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      }).catch((error) => console.error("Error updating data:", error));

      return updatedChecklist; // Update state lokal
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export default handleInput