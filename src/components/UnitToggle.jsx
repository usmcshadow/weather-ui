export default function UnitToggle({ unit, onToggle }) {
  const isC = unit === "C";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "relative inline-flex h-7 w-12 items-center rounded-full",
        "bg-slate-200 ring-1 ring-slate-200 transition"
      ].join(" ")}
      role="switch"
      aria-checked={isC}
      aria-label="Toggle Fahrenheit/Celsius"
    >
      <span
        className={[
          "inline-block h-6 w-6 transform rounded-full bg-brand shadow-sm transition",
          isC ? "translate-x-6" : "translate-x-1"
        ].join(" ")}
      />
    </button>
  );
}