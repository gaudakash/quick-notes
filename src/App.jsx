import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";

function App() {
  // ---------- STATE ----------
  const [notes, setNotes] = useState(() => {
    // Lazy initial state: load from localStorage once
    const saved = localStorage.getItem("quicknotes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 1,
        title: "Learn React Hooks",
        content:
          "Practice useState, useEffect and custom hooks by building small projects every day.",
        category: "Work",
        date: "Mar 6, 2026",
        pinned: true,
      },
      {
        id: 2,
        title: "Grocery List",
        content:
          "Milk, eggs, bread, bananas, coffee, and some snacks for the weekend.",
        category: "Personal",
        date: "Mar 5, 2026",
        pinned: false,
      },
      {
        id: 3,
        title: "App Idea: Habit Tracker",
        content:
          "Build a simple habit tracker with streaks, daily check-ins and beautiful charts.",
        category: "Ideas",
        date: "Mar 4, 2026",
        pinned: false,
      },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ---------- PERSIST NOTES ----------
  useEffect(() => {
    localStorage.setItem("quicknotes", JSON.stringify(notes));
  }, [notes]);

  // ---------- DARK MODE ----------
  useEffect(() => {
    const root = document.documentElement; // <html>
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ---------- ACTIONS ----------
  const handleCreateClick = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id ? { ...n, ...noteData } : n
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        ...noteData,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    handleCloseModal();
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Delete this note?")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const handleTogglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    );
  };

  // ---------- FILTER + SEARCH ----------
  const visibleNotes = notes
    .filter((note) => {
      // Category / Pinned filter
      if (activeFilter === "Pinned") return note.pinned;
      if (activeFilter !== "All" && note.category !== activeFilter) return false;

      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <Navbar
        onCreateClick={handleCreateClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((prev) => !prev)}
      />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["All", "Work", "Personal", "Ideas", "Pinned"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border shadow-sm transition ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notes count */}
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          {visibleNotes.length} note{visibleNotes.length !== 1 ? "s" : ""}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>

        {/* Empty state */}
        {visibleNotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-400">
              No notes found. Create your first note!
            </p>
            <button
              onClick={handleCreateClick}
              className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              + New Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditClick}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
    </div>
  );
}

export default App;