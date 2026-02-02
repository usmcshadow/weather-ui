import { formatDayLabel, roundTemp } from "../utils/formatters";
import { getWeatherIcon } from "../utils/weatherIcons";

export default function ForecastRow({ days = [], unit = "F" }) {
 
  const safeDays = (days || []).slice(0, 5);

  return (
    <div className="grid grid-cols-5 gap-3">
      {safeDays.map((d) => {
        const label = formatDayLabel(d.date);
        const cond = d?.day?.condition?.text ?? "";
        const Icon = getWeatherIcon(cond, true);

        const hi = unit === "F" ? d?.day?.maxtemp_f : d?.day?.maxtemp_c;
        const lo = unit === "F" ? d?.day?.mintemp_f : d?.day?.mintemp_c;

        return (
          <div
            key={d.date}
            className="rounded-2xl bg-slate-50 ring-1 ring-slate-100 py-3 px-2 flex flex-col items-center justify-center text-center"
            title={`${cond} • Low ${roundTemp(lo)}°${unit}`}
          >
            <Icon className="text-lg text-brand" />
            <div className="mt-1 text-sm font-bold text-slate-800 tabular-nums">
              {roundTemp(hi)}°
            </div>
            <div className="mt-1 text-[11px] font-semibold tracking-wide text-slate-500">
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}