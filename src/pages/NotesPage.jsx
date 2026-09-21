import { useEffect, useRef, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../hooks/useNotes";

const DEFAULT_BOARD_SIZE = { width: 1200, height: 800 };

function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, resetNotes } = useNotes();
  const boardRef = useRef(null);
  const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE);

  useEffect(() => {
    const updateBoardSize = () => {
      if (!boardRef.current) {
        return;
      }

      const { width, height } = boardRef.current.getBoundingClientRect();
      setBoardSize({
        width: Math.max(width, 500),
        height: Math.max(height, 500),
      });
    };

    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);

    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

  return (
    <main className="notes-app">
      <header className="notes-toolbar">
        <div>
          <p className="eyebrow">Sticky note</p>
          <h1>Sticky Notes Workspace</h1>
        </div>

        <div className="notes-toolbar__actions">
          <button type="button" className="primary-button" onClick={addNote}>
            Add note
          </button>
          <button
            type="button"
            className="primary-button reset-button"
            onClick={resetNotes}
          >
            Reset board
          </button>
        </div>
      </header>

      <div
        ref={boardRef}
        className="notes-surface"
        aria-label="Sticky note board"
      >
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdate={updateNote}
            onDelete={deleteNote}
            boardSize={boardSize}
          />
        ))}
      </div>
    </main>
  );
}

export default NotesPage;
