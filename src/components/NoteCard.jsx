import { useEffect, useRef, useState } from "react";
import { clampNotePosition } from "../utils/helpers";
import NoteHeader from "./NoteHeader";

function NoteCard({ note, onUpdate, onDelete, boardSize }) {
  const textareaRef = useRef(null);
  const cardRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0, position: { x: 0, y: 0 } });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 8}px`;
  }, [note.text]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!isDragging) {
        return;
      }

      const elementWidth = cardRef.current?.offsetWidth ?? 330;
      const elementHeight = cardRef.current?.offsetHeight ?? 180;
      const nextPosition = clampNotePosition(
        {
          x:
            dragStart.current.position.x +
            (event.clientX - dragStart.current.x),
          y:
            dragStart.current.position.y +
            (event.clientY - dragStart.current.y),
        },
        elementWidth,
        elementHeight,
        boardSize.width,
        boardSize.height,
      );

      onUpdate(note.id, { position: nextPosition });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [boardSize.height, boardSize.width, isDragging, note.id, onUpdate]);

  const handlePointerDown = (event) => {
    const target = event.target.closest("button");

    if (target) {
      return;
    }

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      position: { ...note.position },
    };

    setIsDragging(true);
  };

  const handleTextChange = (event) => {
    onUpdate(note.id, { text: event.target.value });
  };

  const handleColorPick = (colorSet) => {
    onUpdate(note.id, {
      colors: {
        ...note.colors,
        header: colorSet.header,
        body: colorSet.body,
      },
    });
  };

  const autoResize = (event) => {
    const target = event.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight + 8}px`;
  };

  return (
    <div
      ref={cardRef}
      className="note-card"
      style={{
        left: `${note.position.x}px`,
        top: `${note.position.y}px`,
        background: note.colors.body,
      }}
    >
      <NoteHeader
        note={note}
        onPointerDown={handlePointerDown}
        onDelete={() => onDelete(note.id)}
        onColorPick={handleColorPick}
      />

      <div className="note-card__body">
        <textarea
          ref={textareaRef}
          className="note-card__textarea"
          value={note.text}
          onChange={handleTextChange}
          onInput={autoResize}
          style={{
            color: note.colors.text,
            background: note.colors.body,
          }}
        />
      </div>
    </div>
  );
}

export default NoteCard;
