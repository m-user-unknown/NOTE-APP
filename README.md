# Sticky Notes Workspace 📝

A React + Vite note-taking app for creating and organizing sticky notes on a digital board. Notes can be dragged around the workspace, edited in place, recolored, and persist in the browser using localStorage.

## Overview

This project is a lightweight, single-page sticky note board inspired by classic desktop note-taking apps. It includes a default starter board, support for adding more notes, and a reset action to restore the original layout.

## Features

- Add new sticky notes to the board
- Drag notes around the workspace by their header
- Edit note text directly in a resizable textarea
- Change note colors using the header palette
- Delete notes when they are no longer needed
- Reset the board back to the default notes
- Persist note content and positions in browser localStorage
- Responsive board sizing for a large workspace area

## Tech Stack

- React 19
- Vite 6
- JavaScript
- ESLint for code quality
- Vitest for testing

## Project Structure

```bash
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── NoteCard.jsx
│   └── NoteHeader.jsx
├── data/
│   └── defaultNotes.js
├── hooks/
│   └── useNotes.js
├── pages/
│   └── NotesPage.jsx
├── utils/
│   ├── helpers.js
│   └── storage.js
└── icons/
    └── Trash.jsx
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal to use the app.

## Available Scripts

```bash
npm run dev      # start the Vite development server
npm run build    # create a production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint checks
npm test         # run the Vitest test suite
```

## Usage

- Click the "Add note" button to create a new note.
- Drag the note header to reposition it.
- Type directly in the note body to update its content.
- Use the color selector in the note header to change the visual theme.
- Use the trash icon to remove a note.
- Click "Reset board" to restore the default starter notes.

## Notes

The app stores note data in the browser's localStorage under a key named `sticky-note-app-notes`, so notes remain available after a refresh unless the browser storage is cleared.
