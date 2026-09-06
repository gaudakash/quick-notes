function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const categoryColors = {
    Work: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Personal:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Ideas:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  };

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-800 line-clamp-1 dark:text-white">
          {note.title}
        </h2>
        <button
          onClick={() => onTogglePin(note.id)}
          className={`text-lg transition ${
            note.pinned
              ? "text-amber-500"
              : "text-slate-300 hover:text-amber-400 dark:text-slate-600"
          }`}
          title={note.pinned ? "Unpin" : "Pin"}
        >
          📌
        </button>
      </div>

      <span
        className={`mb-3 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
          categoryColors[note.category] ||
          "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        }`}
      >
        {note.category}
      </span>

      <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-3 dark:text-slate-300">
        {note.content}
      </p>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
        <span className="text-xs text-slate-400">{note.date}</span>

        <div className="flex gap-2 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={() => onEdit(note)}
            className="rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;