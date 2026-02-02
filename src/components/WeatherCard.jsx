import { useEffect, useMemo, useState } from "react";
import { FiWind } from "react-icons/fi";
import SearchInput from "./SearchInput";
import UnitToggle from "./UnitToggle";
import ForecastRow from "./ForecastRow";
import weatherUse from "../hooks/weatherUse";
import { normalizeLocation, roundTemp } from "../utils/formatters";
import { getWeatherIcon } from "../utils/weatherIcons";

export default function WeatherCard() {
  const [zip, setZip] = useState("65014");
  const [unit, setUnit] = useState("F"); // "F" | "C"

  const { data, loading, error, fetchWeather } = weatherUse();

  //default zipcode
  useEffect(() => {
    fetchWeather("65014")
  }, []);

  const locationLabel = useMemo(() => {
    if (!data?.location) return "—";
    return normalizeLocation(data.location);
  }, [data]);

  const conditionText = data?.current?.condition?.text ?? "";
  const CurrentIcon = useMemo(
    () => getWeatherIcon(conditionText, Boolean(data?.current?.is_day)),
    [conditionText, data]
  );

  const currentTemp = useMemo(() => {
    if (!data?.current) return null;
    const v = unit === "F" ? data.current.temp_f : data.current.temp_c;
    return roundTemp(v);
  }, [data, unit]);

  const windLabel = useMemo(() => {
    if (!data?.current) return null;
    return `${Math.round(data.current.wind_mph)} mph`;
  }, [data]);

  const forecastDays = data?.forecast?.forecastday ?? [];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 overflow-hidden">
        <div className="p-6 pb-4">
          <SearchInput
            value={zip}
            onChange={setZip}
            onSubmit={() => fetchWeather(zip)}
            loading={loading}
          />

          {error ? (
            <div className="mt-3 rounded-xl bg-rose-50 text-rose-700 px-4 py-3 text-sm ring-1 ring-rose-100">
              {error}
            </div>
          ) : null}
        </div>

        <div className="px-6 pb-6">
          <div className="text-xs font-semibold tracking-wide text-slate-400">
            {(locationLabel || "—").toUpperCase()}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-end gap-2">
              <div className="text-7xl font-normal text-brand leading-none">
                {loading ? "…" : currentTemp ?? "—"}
              </div>
              <div className="pb-2 text-2xl font-bold text-brand">°{unit}</div>
            </div>

            <div className="h-20 w-20 rounded-7xl bg-violet-0 grid place-items-center">
              {loading ? (
                <div className="h-8 w-8 rounded-full border-2 border-violet-200 border-t-brand animate-spin" />
              ) : (
                <CurrentIcon className="text-4xl text-brand" aria-label={conditionText || "Weather"} />
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
            <div className="truncate max-w-[70%]">{loading ? "Loading…" : conditionText}</div>
            {windLabel ? (
              <div className="flex items-center gap-2">
                <FiWind />
                <span className="tabular-nums">{windLabel}</span>
              </div>
            ) : (
              <span className="opacity-0">.</span>
            )}
          </div>

          <div className="mt-6">
            <ForecastRow days={forecastDays} unit={unit} />
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-500">
            <span className={unit === "F" ? "font-semibold text-slate-800" : "font-semibold text-slate-400"}>
              Fahrenheit
            </span>

            <UnitToggle unit={unit} onToggle={() => setUnit(unit === "F" ? "C" : "F")} />

            <span className={unit === "C" ? "font-semibold text-slate-800" : "font-semibold text-slate-400"}>
              Celsius
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-slate-400">Powered by WeatherAPI.com | Developed by vio.ninja</div>
    </div>
  );
}