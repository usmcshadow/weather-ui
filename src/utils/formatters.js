export function roundTemp(value) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return Math.round(Number(value));
}

export function formatDayLabel(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase();
}

export function normalizeLocation(location) {
  const city = location?.name ?? "";
  const region = location?.region ?? "";
  const country = location?.country ?? "";

  if (region) return `${city}, ${region}`;
  if (country) return `${city}, ${country}`;
  return city || "—";
}