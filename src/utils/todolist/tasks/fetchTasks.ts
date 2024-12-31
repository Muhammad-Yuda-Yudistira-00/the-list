import { TaskProps } from "@/types/TaskProps";

export async function fetchTasks(API_URL: string, API_KEY: string, code: string): Promise<TaskProps[]> {
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
    });

    const result = await res.json();

    if (result.status && result.statusCode === 200) {
      console.info(result.message);
      return result.data as TaskProps[];
    } else {
      console.info(result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
