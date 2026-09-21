import { useEffect, useMemo, useState } from 'react';
import { defaultNotes } from '../data/defaultNotes';
import { clampNotePosition } from '../utils/helpers';
import { loadNotes, saveNotes } from '../utils/storage';

const NOTE_WIDTH = 330;
const NOTE_HEIGHT = 180;
const BOARD_WIDTH = 1200;
const BOARD_HEIGHT = 800;

const getResponsiveNoteSize = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  return {
    width: isMobile ? 180 : NOTE_WIDTH,
    height: isMobile ? 120 : NOTE_HEIGHT,
  };
};

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
    const { width, height } = getResponsiveNoteSize();
    const boardWidth = typeof window !== 'undefined' && window.innerWidth <= 640 ? Math.max(window.innerWidth - 24, 280) : BOARD_WIDTH;
    const boardHeight = typeof window !== 'undefined' && window.innerHeight <= 900 ? Math.max(window.innerHeight - 220, 420) : BOARD_HEIGHT;
    const newNote = {
      id: `note-${Date.now()}-${nextIndex}`,
      text: 'New sticky note...',
      position: clampNotePosition(
        {
          x: 70 + (notes.length % 4) * 90,
          y: 70 + (notes.length % 3) * 90,
        },
        width,
        height,
        boardWidth,
        boardHeight,
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

        const { width, height } = getResponsiveNoteSize();
        const boardWidth = typeof window !== 'undefined' && window.innerWidth <= 640 ? Math.max(window.innerWidth - 24, 280) : BOARD_WIDTH;
        const boardHeight = typeof window !== 'undefined' && window.innerHeight <= 900 ? Math.max(window.innerHeight - 220, 420) : BOARD_HEIGHT;

        const nextPosition = updates.position
          ? clampNotePosition(updates.position, width, height, boardWidth, boardHeight)
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
