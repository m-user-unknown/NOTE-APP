const palette = [
  { header: "#FED0FD", body: "#FEE5FD" },
  { header: "#9BD1DE", body: "#CDECF8" },
  { header: "#FFEFBE", body: "#FFF8DA" },
  { header: "#B7E4C7", body: "#E9F7EF" },
];

function NoteHeader({ note, onPointerDown, onDelete, onColorPick }) {
  return (
    <div
      className="note-header"
      onPointerDown={(event) => {
        if (event.target.closest("button")) {
          return;
        }

        onPointerDown(event);
      }}
      style={{ background: note.colors.header }}
    >
      <span className="note-header__title">Sticky Note</span>

      <div className="note-header__actions">
        <div className="note-header__palette" aria-label="Choose note colors">
          {palette.map((colorSet) => (
            <button
              key={`${colorSet.header}-${colorSet.body}`}
              type="button"
              aria-label="Change note color"
              className="note-header__swatch"
              onClick={() => onColorPick(colorSet)}
              style={{
                background: `linear-gradient(135deg, ${colorSet.header}, ${colorSet.body})`,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          className="note-header__delete"
          aria-label="Delete note"
          onClick={onDelete}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default NoteHeader;
