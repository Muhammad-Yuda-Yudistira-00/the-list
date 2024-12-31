const handleCursorSelection = (
  target: HTMLElement,
  setHasClicked: (value: boolean) => void
) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(target); // Seleksi isi elemen
  selection?.removeAllRanges();
  selection?.addRange(range);

  // Tandai elemen sudah diklik
  setHasClicked(true);
};

export default handleCursorSelection;
