import {
  FiSun,
  FiCloud,
  FiCloudRain,
  FiCloudSnow,
  FiCloudDrizzle,
  FiCloudLightning
} from "react-icons/fi";

export function getWeatherIcon(conditionText = "", isDay = true) {
  const t = String(conditionText).toLowerCase();

  if (t.includes("thunder")) return FiCloudLightning;
  if (t.includes("snow") || t.includes("sleet") || t.includes("blizzard"))
    return FiCloudSnow;
  if (t.includes("drizzle")) return FiCloudDrizzle;
  if (t.includes("rain") || t.includes("shower")) return FiCloudRain;
  if (
    t.includes("cloud") ||
    t.includes("overcast") ||
    t.includes("mist") ||
    t.includes("fog")
  )
    return FiCloud;

  return FiSun;
}