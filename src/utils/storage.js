import { defaultNotes } from '../data/defaultNotes';

const STORAGE_KEY = 'sticky-note-app-notes';

function normalizeNote(note) {
  return {
    id: note?.id ?? `note-${Date.now()}`,
    text: typeof note?.text === 'string' ? note.text : '',
    position: {
      x: Number(note?.position?.x) || 0,
      y: Number(note?.position?.y) || 0,
    },
    colors: {
      header: note?.colors?.header ?? '#FED0FD',
      body: note?.colors?.body ?? '#FEE5FD',
      text: note?.colors?.text ?? '#1f2937',
    },
  };
}

export function loadNotes() {
  if (typeof window === 'undefined') {
    return defaultNotes;
  }

  try {
    const savedNotes = window.localStorage.getItem(STORAGE_KEY);

    if (!savedNotes) {
      return defaultNotes;
    }

    const parsed = JSON.parse(savedNotes);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultNotes;
    }

    return parsed.map(normalizeNote);
  } catch {
    return defaultNotes;
  }
}

export function saveNotes(notes) {
  if (typeof window === 'undefined') {
    return;
  }

  const safeNotes = Array.isArray(notes) ? notes.map(normalizeNote) : [];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeNotes));
}
