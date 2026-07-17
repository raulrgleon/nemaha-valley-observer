"use client";

import { useEffect, useState } from "react";
import { CloudRain, Droplets, Wind } from "lucide-react";

type Weather = {
  city: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  windMph: number;
  humidity: number;
  precipChance: number;
  forecast: Array<{ day: string; high: number; low: number; icon: string }>;
};

export function WeatherWidget() {
  const [city, setCity] = useState("Auburn");
  const [data, setData] = useState<Weather | null>(null);

  useEffect(() => {
    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [city]);

  return (
    <section
      aria-labelledby="weather-heading"
      className="border border-line bg-bg-elevated p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 id="weather-heading" className="font-serif text-lg font-bold">
          Weather
        </h2>
        <label className="text-xs text-ink-muted">
          <span className="sr-only">Select city</span>
          <select
            className="border border-line bg-bg px-2 py-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Weather location"
          >
            <option>Auburn</option>
            <option>Tecumseh</option>
          </select>
        </label>
      </div>
      {!data ? (
        <p className="text-sm text-ink-muted">Loading forecast…</p>
      ) : (
        <>
          <div className="mt-1 flex items-end gap-3">
            <p className="font-serif text-5xl font-bold leading-none">{data.temp}°</p>
            <div className="pb-1 text-sm text-ink-muted">
              <p className="capitalize">{data.condition}</p>
              <p>
                H {data.high}° · L {data.low}°
              </p>
            </div>
          </div>
          <ul className="mt-4 grid grid-cols-3 gap-2 text-xs text-ink-muted">
            <li className="flex items-center gap-1">
              <Wind className="size-3.5" aria-hidden /> {data.windMph} mph
            </li>
            <li className="flex items-center gap-1">
              <Droplets className="size-3.5" aria-hidden /> {data.humidity}%
            </li>
            <li className="flex items-center gap-1">
              <CloudRain className="size-3.5" aria-hidden /> {data.precipChance}% rain
            </li>
          </ul>
          <ol className="mt-4 grid grid-cols-5 gap-1 border-t border-line pt-3 text-center text-xs">
            {data.forecast.map((d) => (
              <li key={d.day}>
                <p className="font-semibold">{d.day}</p>
                <p aria-hidden className="my-1">
                  {d.icon}
                </p>
                <p>
                  {d.high}°/{d.low}°
                </p>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}
