import List from "@/components/content/List";
import {useState, useEffect} from "react"
import { getCursorPosition, setCursorPosition } from "@/utils/CursorPosition";
import { useRouter } from "next/router";

type ChecklistProps = {
	id: number;
	code: string;
	title: string;
	description: string;
	updated_at: string;
}

export default function task() {
	const router = useRouter()
	const {checklist: id} = router.query
	
	const API_URL = process.env.NEXT_PUBLIC_API_URL
	const API_KEY = process.env.NEXT_PUBLIC_API_KEY

	const [checklist, setChecklist] = useState<ChecklistProps>({
    id: 0,
    code: "",
    title: "",
    description: "",
    updated_at: "",
  });


	 useEffect(() => {
	    const fetchData = async () => {
	      try {
	        const response = await fetch(`${API_URL}/checklist/${id}`, {
	        	method: "GET",
	          headers: {
	            "Content-Type": "application/json",
	            "x-api-key": API_KEY,
	          },
	        });
	        
	        const result = await response.json();

	        let data: ChecklistProps = {
	          id: 0,
	          code: "",
	          title: "",
	          description: "",
	          updated_at: "",
	        };

        	if(result.status && result.statusCode == 200) {
        		console.info(result.message)
        		data = result.data
        	} else {
        		console.info(result.message)
        	}
	        setChecklist(data);
	      } catch (error) {
	        console.error("Error fetching data:", error);
	      }
	    };

	    fetchData();
	  }, [id, API_URL, API_KEY, router]);

	const handleInput = async (e: React.FormEvent<HTMLDivElement>) => {
	  const target = e.target as HTMLElement; // Definisikan target
	  const text = target.innerText.trim();
	  const fieldType = target.dataset.type;

	  if (!fieldType) {
	    console.error("Unknown input type");
	    return;
	  }

	  // Simpan posisi kursor
	  const cursorPosition = getCursorPosition(target);

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


	return (
		<div className="py-4 text-center m-auto flex flex-col items-center justify-center min-h-screen">
	      <div className="pb-8">
	        <h1 className="text-3xl" data-type="title" suppressContentEditableWarning contentEditable onInput={handleInput}>{checklist.title?? 'Untitle'}</h1>
	        <small data-type="description" suppressContentEditableWarning contentEditable onInput={handleInput}>{checklist.description?? 'Description...'}</small>
	      </div>
	      <List code={checklist.code} />
	    </div>
		)
}