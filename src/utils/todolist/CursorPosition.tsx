 export const getCursorPosition = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    return {
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    };
  }
  return null;
};

export const setCursorPosition = (element: HTMLElement, position: { startOffset: number; endOffset: number }) => {
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    range.setStart(element.firstChild || element, position.startOffset);
    range.setEnd(element.firstChild || element, position.endOffset);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};