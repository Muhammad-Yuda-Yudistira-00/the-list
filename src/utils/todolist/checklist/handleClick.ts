import handleCursorSelection from '@/utils/todolist/checklist/handleCursorSelection';

const handleClick = (
  e: React.MouseEvent<HTMLElement>,
  hasClickedTitle: boolean,
  setHasClickedTitle: (value: boolean) => void,
  hasClickedDescription: boolean,
  setHasClickedDescription: (value: boolean) => void
) => {
  const target = e.currentTarget as HTMLElement;
  const fieldType = target.dataset.type;

  if (fieldType === "title" && !hasClickedTitle) {
    handleCursorSelection(target, setHasClickedTitle);
  } else if (fieldType === "description" && !hasClickedDescription) {
    handleCursorSelection(target, setHasClickedDescription);
  }
};

export default handleClick;
