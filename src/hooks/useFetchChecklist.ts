import { useState, useEffect } from "react";
import ChecklistProps from "@/types/ChecklistProps";

export const useFetchChecklist = (
  code: string | string[] | undefined,
  API_URL: string | undefined,
  API_KEY: string | undefined
) => {
  const [checklist, setChecklist] = useState<ChecklistProps>({
    id: 0,
    code: "",
    title: "",
    description: "",
    updated_at: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!code || !API_URL || !API_KEY) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/checklist/${code}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        });

        const result = await response.json();

        if (result.status && result.statusCode === 200) {
          setChecklist(result.data);
        } else {
          console.info(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [code, API_URL, API_KEY]);

  return { checklist, setChecklist, isLoading };
};
