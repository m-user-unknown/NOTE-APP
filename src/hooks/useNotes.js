import { useEffect, useMemo, useState } from 'react';
import { defaultNotes } from '../data/defaultNotes';
import { clampNotePosition } from '../utils/helpers';
import { loadNotes, saveNotes } from '../utils/storage';

const NOTE_WIDTH = 330;
const NOTE_HEIGHT = 180;
const BOARD_WIDTH = 1200;
const BOARD_HEIGHT = 800;

const cloneDefaultNotes = () =>
  defaultNotes.map((note) => ({
    ...note,
    position: { ...note.position },
    colors: { ...note.colors },
  }));

export function useNotes() {
  const [notes, setNotes] = useState(() => loadNotes());

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = () => {
    const nextIndex = notes.length + 1;
    const newNote = {
      id: `note-${Date.now()}-${nextIndex}`,
      text: 'New sticky note...',
      position: clampNotePosition(
        {
          x: 70 + (notes.length % 4) * 90,
          y: 70 + (notes.length % 3) * 90,
        },
        NOTE_WIDTH,
        NOTE_HEIGHT,
        BOARD_WIDTH,
        BOARD_HEIGHT,
      ),
      colors: {
        header: '#B7E4C7',
        body: '#E9F7EF',
        text: '#1f2937',
      },
    };

    setNotes((currentNotes) => [...currentNotes, newNote]);
  };

  const updateNote = (id, updates) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id !== id) {
          return note;
        }

        const nextPosition = updates.position
          ? clampNotePosition(updates.position, NOTE_WIDTH, NOTE_HEIGHT, BOARD_WIDTH, BOARD_HEIGHT)
          : note.position;

        return {
          ...note,
          ...updates,
          position: nextPosition,
        };
      }),
    );
  };

  const deleteNote = (id) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  };

  const resetNotes = () => {
    setNotes(cloneDefaultNotes());
  };

  return useMemo(
    () => ({
      notes,
      addNote,
      updateNote,
      deleteNote,
      resetNotes,
    }),
    [notes],
  );
}
