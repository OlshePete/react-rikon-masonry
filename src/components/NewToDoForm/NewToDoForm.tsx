import React, {
  FC,
  useState,
  useRef,
  useEffect,
} from "react";
import { MasonryItemProps, NewToDoFormProps } from "../MasonryToDo/MasonryToDo";
import "./NewToDoForm.scss";


export function calculateFormattedDateNow(): string {
  const currentDate = new Date();
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(currentDate);
}
const NewToDoForm: FC<NewToDoFormProps> = ({ onAddItem }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [newItem, setNewItem] = useState<MasonryItemProps>({
    id: 0,
    title: "",
    createdAt: "",
    content: "",
  });
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    if (!newItem.content || newItem.content.length === 0) {
      if (contentRef.current && contentRef.current.children.length !== 0) {
        contentRef.current.innerHTML = "";
      }
    }
  }, [newItem.content]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const { id, textContent } = e.currentTarget;
    setNewItem((prevItem) => ({
      ...prevItem,
      [id]: textContent,
    }));
  };

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (newItem.title && newItem.content) {
      const formattedDate = calculateFormattedDateNow();
      onAddItem({
        ...newItem,
        content: contentRef.current?.innerHTML || "",
        createdAt: formattedDate,
      });

      setNewItem({
        id: newItem.id ? newItem.id + 1 : 1,
        title: "",
        createdAt: "",
        content: "",
      });
    }
    if (contentRef.current) {
      contentRef.current.innerHTML = "";
    }
    setHasSelection(false);
  };

  const clearSelections = (e: React.MouseEvent) => {

    const boldTags = contentRef.current?.querySelectorAll("b");
    boldTags?.forEach((boldTag) => {
      const parent = boldTag.parentNode as Node;
      while (boldTag.firstChild) {
        parent.insertBefore(boldTag.firstChild, boldTag);
      }
      parent.removeChild(boldTag);
    });
    setHasSelection(false);
  };

  const handleSelection = () => {

    try {
      const selection = window.getSelection();

      if (!selection || selection.isCollapsed) {
        return;
      }

      const range = selection.getRangeAt(0);
      const newNode = document.createElement("b");

      // Проверка и устранение ошибки "Failed to execute 'compareBoundaryPoints'"
      const normalizeRange = (r: Range) => {
        if (r.startContainer.ownerDocument !== document) {
          const normalizedRange = document.createRange();
          normalizedRange.selectNodeContents(r.startContainer);
          normalizedRange.setStart(r.startContainer, r.startOffset);
          normalizedRange.setEnd(r.endContainer, r.endOffset);
          return normalizedRange;
        }
        return r;
      };

      // Проверка на пересечение предыдущих выделений тегом <b>
      const existingBoldTags = contentRef.current?.querySelectorAll("b");
      existingBoldTags?.forEach((boldTag) => {
        const existingRange = document.createRange();
        existingRange.selectNodeContents(boldTag);

        // Проверка на пересечение
        const normalizedRange = normalizeRange(existingRange);
        const normalizedSelection = normalizeRange(range);

        if (
          normalizedSelection.compareBoundaryPoints(
            Range.END_TO_START,
            normalizedRange
          ) === -1 &&
          normalizedSelection.compareBoundaryPoints(
            Range.START_TO_END,
            normalizedRange
          ) === 1
        ) {
          // Объединение выделений в один тег <b>
          const mergedNode = document.createElement("b");
          const combinedContents = boldTag.innerHTML + newNode.innerHTML;
          mergedNode.innerHTML = combinedContents;

          // Замена старого тега <b> новым объединенным тегом
          boldTag.replaceWith(mergedNode);
          return;
        } else {
          // console.log("не входит");
        }
      });

      newNode.appendChild(range.extractContents()); // Выделенный контент помещается в новый тег <b>
      // Обертывание выделенного контента новым тегом <b>
      range.insertNode(newNode);
      setHasSelection(true);
    } catch (error) {
      console.error("Произошла ошибка при обработке выделения:", error);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); 

    const pastedText = e.clipboardData.getData('text/plain');
    
    // Вставляем текст в div
    document.execCommand('insertText', false, pastedText);
  };

  return (
    <form onSubmit={handleAddItem} className="newToDoForm">
      <label>
        заголовок
        <input
          type="text"
          name="title"
          value={newItem.title}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <div className="content-container">
      <label>
        содержание
        <div
          ref={contentRef}
          contentEditable
          id="content"
          suppressContentEditableWarning={true}
          onInput={handleContentChange}
          onMouseUp={handleSelection}
          onPaste={handlePaste}
        ></div>
      </label>
        {hasSelection && (
          <button type="button" className="reset-selection" onClick={clearSelections}>
            сбросить выделения
          </button>
        )}
      </div>

      <br />
      <div className="form-actions">
        <span>
         выделить часть содержания, для жирного начертания 
        </span>
        <button type="submit">сохранить запись</button>
      </div>
    </form>
  );
};

export default NewToDoForm;
