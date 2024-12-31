import {useState, useEffect} from "react"
import { useRouter } from "next/router";

import List from "@/components/content/List";

import handleClick from "@/utils/todolist/checklist/handleClick";
import handleInput from '@/utils/todolist/checklist/handleInput';
import handleDeleteChecklist from '@/utils/todolist/checklist/handleDeleteChecklist';

import ChecklistProps from "@/types/ChecklistProps"

import { useFetchChecklist } from "@/hooks/useFetchChecklist";

export default function Checklist() {
	const router = useRouter()
	const {checklist: id} = router.query
	const [hasClickedTitle, setHasClickedTitle] = useState(false);
	const [hasClickedDescription, setHasClickedDescription] = useState(false);
	
	const API_URL = process.env.NEXT_PUBLIC_API_URL
	const API_KEY = process.env.NEXT_PUBLIC_API_KEY

	const { checklist, setChecklist, isLoading } = useFetchChecklist(id, API_URL, API_KEY);


	 if(isLoading) {
	 	return (
 			<div className="py-4 m-auto flex flex-col items-center justify-center min-h-screen">
     			 <div className="pb-8 text-center">
     			 	<p>Loading...</p>
     			 </div>
     		</div>
	 		)
	 }

	return (
		<div className="py-4 m-auto flex flex-col items-center justify-center min-h-screen">
	      <div className="pb-8 text-center">
      		<h1 className="text-3xl" data-type="title" suppressContentEditableWarning contentEditable onInput={(e) => handleInput(e, setChecklist)} onClick={(e) =>
								          handleClick(
								            e,
								            hasClickedTitle,
								            setHasClickedTitle,
								            hasClickedDescription,
								            setHasClickedDescription
								          )
								        } >{checklist.title?? 'Untitle'}</h1>
        	<small data-type="description" suppressContentEditableWarning contentEditable onInput={(e) => handleInput(e, setChecklist)} onClick={(e) =>
							          handleClick(
							            e,
							            hasClickedTitle,
							            setHasClickedTitle,
							            hasClickedDescription,
							            setHasClickedDescription
							          )
							        } >{checklist.description?? 'Description...'}</small>
	      </div>
	      <List code={checklist.code} />
	      <div className="pt-4">
	      	<p><a href="#" className="underline" onClick={(e) => {
													        e.preventDefault();
													        handleDeleteChecklist({
													          checklistId: checklist.id,
													          API_URL,
													          API_KEY,
													          router,
													        });
													      }}>delete</a> checklist !</p>
	      </div>
	    </div>
		)
}