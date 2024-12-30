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

export default function Checklist() {
	const router = useRouter()
	const {checklist: id} = router.query
	const [isLoading, setIsLoading] = useState(true);
	
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
	 	if(!id) return
	    const fetchData = async () => {
		    if (!API_KEY) {
		        throw new Error("API key is missing");
		      }
		  setIsLoading(true);
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
	      } finally {
            setIsLoading(false);
        	}
	    };

	    fetchData();
	  }, [id, API_URL, API_KEY]);

	const handleInput = async (e: React.FormEvent<HTMLDivElement>) => {
	  const target = e.target as HTMLElement; // Definisikan target
	  const text = target.innerText.trim();
	  const fieldType = target.dataset.type;

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

	const handleDeleteChecklist = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		if(!confirm("Are you sure?")) return

		try{
			if(!API_KEY) throw new Error("apikey is missing!")

			fetch(`${API_URL}/checklist/${checklist.id}`, {
				method: "DELETE",
				headers: {
					"x-api-key": API_KEY,
				}
			}).catch((err) => console.error("Error deleted data:", err))

			router.push('/')
		} catch(error) {
			console.error("Error deleting data:", error)
		}
	}


	return (
		<div className="py-4 text-center m-auto flex flex-col items-center justify-center min-h-screen">
	      <div className="pb-8">
	      	{isLoading ? (<p>Loading...</p>) : (
	      		<>
		      		<h1 className="text-3xl" data-type="title" suppressContentEditableWarning contentEditable onInput={handleInput}>{checklist.title?? 'Untitle'}</h1>
		        	<small data-type="description" suppressContentEditableWarning contentEditable onInput={handleInput}>{checklist.description?? 'Description...'}</small>
	      		</>
	      	)}
	      </div>
	      <List code={checklist.code} />
	      <div className="pt-4">
	      	<p><a href="#" className="underline" onClick={handleDeleteChecklist}>delete</a> checklist !</p>
	      </div>
	    </div>
		)
}