import { FiSearch } from "react-icons/fi";

export default function SearchInput({ value, onChange, onSubmit, loading }) {
  const canSearch = value.trim().length >= 3;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSearch || loading) return;
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Zip Code"
        className={[
          "w-full rounded-2xl bg-slate-100/70 px-5 py-4 pr-14",
          "text-slate-900 placeholder:text-slate-400",
          "outline-none ring-1 ring-transparent focus:ring-slate-200",
          "transition"
        ].join(" ")}
        inputMode="search"
        aria-label="Zip Code"
      />

      <button
        type="submit"
        disabled={!canSearch || loading}
        className={[
          "absolute right-2 top-1/2 -translate-y-1/2",
          "h-10 w-10 rounded-full",
          "bg-brand text-white",
          "grid place-items-center",
          "shadow-sm",
          (!canSearch || loading) ? "opacity-60 cursor-not-allowed" : ""
        ].join(" ")}
        aria-label="Search"
        title="Fetch weather"
      >
        <FiSearch className="text-lg" />
      </button>
    </form>
  );
}