import { getCursorPosition, setCursorPosition } from "@/utils/todolist/CursorPosition";
import ChecklistProps from "@/types/ChecklistProps"
import normalizeCapitalization from "@/utils/todolist/checklist/normalizeCapitalization"


export const handleInput = async (e: React.FormEvent<HTMLElement>, setChecklist: React.Dispatch<React.SetStateAction<ChecklistProps>>) => {
  const target = e.target as HTMLElement; // Definisikan target
  const rawText = target.innerText.trim();
  const fieldType = target.dataset.type;

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY

  if (!fieldType) {
    console.error("Unknown input type");
    return;
  }

   // Normalisasi kapitalisasi teks
  const normalizedText = normalizeCapitalization(rawText);

  // Simpan posisi kursor
  const cursorPosition = getCursorPosition();

  try {
    setChecklist((prevChecklist) => {
      const updatedChecklist = {
        ...prevChecklist,
        [fieldType]: normalizedText,
      };

      // Kembalikan posisi kursor setelah state diperbarui
      setTimeout(() => {
        if (cursorPosition) setCursorPosition(target, cursorPosition);
      }, 0);

      // Kirim data ke API
      const formData = new FormData();
      formData.append(fieldType, normalizedText);

      if (!API_KEY) {
        throw new Error("API key is missing");
      }

      fetch(`${API_URL}/checklist/${prevChecklist.code}`, {
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