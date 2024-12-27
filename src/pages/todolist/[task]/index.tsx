import List from "@/components/content/List";
import {useState} from "react"

export default function task() {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const handleInput = (e) => {
		const text = e.target.innerText.trim()
		switch(e.target.dataset.type) {
			case "title":
				setTitle(text)
				break
			case "description":
				setDescription(text)
				break
			default:
        		console.error("Unknown input type");
		}
	}
	return (
		<div className="py-4 text-center m-auto flex flex-col items-center justify-center min-h-screen">
	      <div className="pb-8">
	        <h1 className="text-3xl" data-type="title" suppressContentEditableWarning contentEditable onInput={handleInput}>Untitled</h1>
	        <small data-type="description" suppressContentEditableWarning contentEditable onInput={handleInput}>Description...</small>
	      </div>
	      <List />
	    </div>
		)
}