import { useCallback, useRef, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function weatherUse() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const abortRef = useRef(null);

  const fetchWeather = useCallback(async (query) => {
    const q = String(query || "").trim();
    if (!q) return;

    if (!API_KEY) {
      setError("Missing API key. Add VITE_WEATHER_API_KEY to your .env file.");
      return;
    }

    setLoading(true);
    setError("");

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const url = new URL("https://api.weatherapi.com/v1/forecast.json");
      url.searchParams.set("key", API_KEY);
      url.searchParams.set("q", q);
      url.searchParams.set("days", "5");
      url.searchParams.set("aqi", "no");
      url.searchParams.set("alerts", "no");

      const res = await fetch(url.toString(), {
        signal: abortRef.current.signal
      });

      if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
          const errJson = await res.json();
          message = errJson?.error?.message || message;
        } catch {
          // ignore parse errors
        }
        throw new Error(message);
      }

      const json = await res.json();
      setData(json);
    } catch (e) {
      if (e?.name === "AbortError") return;
      setData(null);
      setError(e?.message || "Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchWeather };
}