import { FiPlus, FiMoon, FiSun, FiSearch } from "react-icons/fi";
import { FaNotesMedical } from "react-icons/fa6";


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
            <FaNotesMedical />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">
            QuickNotes
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="relative hidden flex-1 md:block max-w-md">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500/40"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDark}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            title="Toggle dark mode"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <FiPlus className="h-4 w-4" />
            <span className="hidden sm:inline">New Note</span>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-slate-100 px-4 py-2 md:hidden dark:border-slate-800">
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;