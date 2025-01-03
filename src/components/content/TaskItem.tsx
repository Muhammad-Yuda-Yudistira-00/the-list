import { useDrag, useDrop } from "react-dnd";
import {TaskProps} from "@/types/TaskProps"
import { useEffect, useRef } from "react";
import { RiDeleteBin5Line, RiDragMoveFill } from "react-icons/ri";
import { Checkbox, Label } from "flowbite-react";
import { robotoMono } from "@/libs/googleFonts/fontsStyle"
import {handleInput} from "@/utils/todolist/tasks/handleInput";
import {handleChange} from "@/utils/todolist/tasks/handleChange";

const ItemType = "TASK";

export default function TaskItem({
  task,
  index,
  handleDelete,
  handleDragEnd,
  API_URL,
  API_KEY,
  code,
  setTasks
}: {
  task: TaskProps;
  index: number;
  handleDelete: (taskId: number) => void;
  handleDragEnd: (draggedId: number, droppedId: number) => void;
  API_URL: string;
  API_KEY: string;
  code: string;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (item: { id: number; index: number }) => {
      if (item.index !== index) {
        handleDragEnd(item.id, task.id);
      }
    },
  }));

   // Gunakan `useRef` untuk referensi elemen DOM
  const ref = useRef<HTMLDivElement | null>(null);

  // Gabungkan `drag` dan `drop` dengan `useEffect`
  useEffect(() => {
    if (ref.current) {
      drag(drop(ref));
    }
  }, [drag, drop]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-2 ${isDragging ? "opacity-50" : ""} border-b-2 border-white border-dashed pt-2`}
    >
      <RiDragMoveFill className="cursor-pointer flex-shrink-0 hover:text-stone-800 hover:scale-150 text-stone-700" />
      <RiDeleteBin5Line
        className="text-white hover:text-logoColor cursor-pointer flex-shrink-0"
        onClick={() => handleDelete(task.id)}
      />
      <Checkbox
        checked={task.status === "done"}
        onChange={(e) => handleChange(e, API_URL!, API_KEY!, code, setTasks)}
        data-id={task.id.toString()}
        className="text-stone-500 focus:ring-stone-400 dark:ring-offset-stone-400 dark:focus:ring-stone-400"
      />
      <Label
        className={`text-logoColor text-lg font-bold ${task.status === "done" ? "line-through" : ""} decoration-white/80 decoration-wavy decoration-2 ${robotoMono.className}`}
        data-id={task.id.toString()}
        suppressContentEditableWarning
        contentEditable
        onInput={(e) => handleInput(e, API_URL!, API_KEY!, code, setTasks)}
      >
        {task.title}
      </Label>
    </div>
  );
}