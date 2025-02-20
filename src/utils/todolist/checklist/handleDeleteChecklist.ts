import { NextRouter } from 'next/router'; // Import tipe untuk router jika menggunakan TypeScript

interface DeleteChecklistProps {
  checklistCode: string;
  API_URL: string;
  API_KEY: string | undefined;
  router: NextRouter;
}

const handleDeleteChecklist = async ({ checklistCode, API_URL, API_KEY, router }: DeleteChecklistProps) => {
  if (!confirm("Are you sure?")) return;

  try {
    if (!API_KEY) throw new Error("API key is missing!");

    await fetch(`${API_URL}/checklist/${checklistCode}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    }).catch((err) => console.error("Error deleting data:", err));

    router.push('/');
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export default handleDeleteChecklist;
