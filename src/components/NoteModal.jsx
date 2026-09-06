import { useState, useEffect } from "react";

function NoteModal({ isOpen, onClose, onSave, editingNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category);
      setPinned(editingNote.pinned);
    } else {
      setTitle("");
      setContent("");
      setCategory("Work");
      setPinned(false);
    }
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }
    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      pinned,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white">
          {editingNote ? "Edit Note" : "Create Note"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="note-title"
              className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Title
            </label>
            <input
              id="note-title"
              name="title"
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-500/30"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="note-category"
              className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Category
            </label>
            <select
              id="note-category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Ideas">Ideas</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="note-content"
              className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Content
            </label>
            <textarea
              id="note-content"
              name="content"
              rows="5"
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-500/30"
            />
          </div>

          {/* Pin */}
          <div className="flex items-center gap-2">
            <input
              id="note-pinned"
              name="pinned"
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="rounded"
            />
            <label
              htmlFor="note-pinned"
              className="text-sm text-slate-600 dark:text-slate-300"
            >
              Pin this note
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {editingNote ? "Update Note" : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;