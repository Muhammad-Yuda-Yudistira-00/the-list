import { Checkbox, Label } from "flowbite-react";
import { useState } from "react";

export default function List() {
  const [task, setTask] = useState([])
  console.log("before:", {task})
  const handleInput = (e) => {
    const text = e.target.innerText.trim()
    setTask([...task, text])
    console.log("after:", {task})
  }
  return (
    <div className="flex max-w-md flex-col gap-4" id="checkbox">
      <div className="flex items-center gap-2">
        <Checkbox />
        <input type="text" placeholder="write task.." />
        <Label className="text-gray-300"></Label>
      </div>
    </div>
  );
}
