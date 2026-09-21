export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function clampNotePosition(position, noteWidth, noteHeight, boardWidth, boardHeight) {
  if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') {
    return { x: 0, y: 0 };
  }

  const maxX = Math.max(0, (boardWidth ?? 1200) - (noteWidth ?? 330));
  const maxY = Math.max(0, (boardHeight ?? 800) - (noteHeight ?? 180));

  return {
    x: clamp(position.x, 0, maxX),
    y: clamp(position.y, 0, maxY),
  };
}
