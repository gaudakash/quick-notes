import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";

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
      {/* Top row */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-800 line-clamp-1 dark:text-white">
          {note.title}
        </h2>

        <button
          type="button"
          onClick={() => onTogglePin(note.id)}
          className={`rounded-lg p-1.5 transition ${
            note.pinned
              ? "text-amber-500 bg-amber-50 dark:bg-amber-900/20"
              : "text-slate-300 hover:text-amber-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-700"
          }`}
          title={note.pinned ? "Unpin" : "Pin"}
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
        >
          {note.pinned ? (
            <BsPinAngleFill className="h-4 w-4" />
          ) : (
            <BsPinAngle className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Category */}
      <span
        className={`mb-3 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
          categoryColors[note.category] ||
          "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        }`}
      >
        {note.category}
      </span>

      {/* Content */}
      <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-3 dark:text-slate-300">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
        <span className="text-xs text-slate-400">{note.date}</span>

        {/* 
          Mobile/tablet: always visible
          Desktop: show on hover
        */}
        <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
            title="Edit"
            aria-label="Edit note"
          >
            <FiEdit2 className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            title="Delete"
            aria-label="Delete note"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;