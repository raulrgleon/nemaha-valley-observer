import { NextRequest, NextResponse } from "next/server";

type WeatherPayload = {
  city: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  windMph: number;
  humidity: number;
  precipChance: number;
  forecast: Array<{ day: string; high: number; low: number; icon: string }>;
  source: "openweather" | "demo";
};

const demoWeather = (city: string): WeatherPayload => ({
  city,
  temp: 78,
  condition: "Partly cloudy",
  high: 84,
  low: 63,
  windMph: 8,
  humidity: 42,
  precipChance: 20,
  forecast: [
    { day: "Sat", high: 82, low: 64, icon: "☀" },
    { day: "Sun", high: 79, low: 61, icon: "⛅" },
    { day: "Mon", high: 76, low: 59, icon: "🌧" },
    { day: "Tue", high: 80, low: 62, icon: "☀" },
    { day: "Wed", high: 84, low: 65, icon: "☀" },
  ],
  source: "demo",
});

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") || "Auburn";
  const key = process.env.OPENWEATHER_API_KEY;

  if (!key) {
    return NextResponse.json(demoWeather(city));
  }

  try {
    const q = encodeURIComponent(`${city},NE,US`);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=imperial&appid=${key}`;
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error("weather failed");
    const data = await res.json();
    return NextResponse.json({
      city,
      temp: Math.round(data.main.temp),
      condition: data.weather?.[0]?.description ?? "Clear",
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      windMph: Math.round(data.wind?.speed ?? 0),
      humidity: data.main.humidity,
      precipChance: 0,
      forecast: demoWeather(city).forecast,
      source: "openweather",
    } satisfies WeatherPayload);
  } catch {
    return NextResponse.json(demoWeather(city));
  }
}
