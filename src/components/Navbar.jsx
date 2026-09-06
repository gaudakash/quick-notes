function Navbar({
  onCreateClick,
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleDark,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
            Q
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">
            QuickNotes
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden flex-1 md:block max-w-md">
          <label htmlFor="search-notes" className="sr-only">
            Search notes
          </label>
          <input
            id="search-notes"
            name="search"
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500/40"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDark}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            title="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            onClick={onCreateClick}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            + New Note
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-slate-100 px-4 py-2 md:hidden dark:border-slate-800">
        <label htmlFor="search-notes-mobile" className="sr-only">
          Search notes
        </label>
        <input
          id="search-notes-mobile"
          name="search-mobile"
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>
    </header>
  );
}

export default Navbar;