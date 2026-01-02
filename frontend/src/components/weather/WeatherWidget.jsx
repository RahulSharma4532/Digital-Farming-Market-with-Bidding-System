import React, { useEffect, useState } from 'react';
import { CloudSun, Wind, Droplets, CloudRain, Sun, CloudSnow, CloudLightning, Loader } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

export default function WeatherWidget() {
    const { coords, loading: locationLoading, error: locationError } = useLocation();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!coords) return;

        const fetchWeather = async () => {
            try {
                setLoading(true);
                // Using Open-Meteo Free API
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`);
                const data = await response.json();
                setWeather(data.current_weather);
            } catch (err) {
                console.error("Weather fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [coords]);

    // Helper to get icon based on WMO weather code
    const getWeatherIcon = (code) => {
        if (code === 0 || code === 1) return <Sun className="w-6 h-6 text-yellow-500" />;
        if (code > 1 && code < 48) return <CloudSun className="w-6 h-6 text-yellow-400" />;
        if (code >= 51 && code <= 67) return <CloudRain className="w-6 h-6 text-blue-400" />;
        if (code >= 71 && code <= 77) return <CloudSnow className="w-6 h-6 text-white" />;
        if (code >= 95) return <CloudLightning className="w-6 h-6 text-purple-400" />;
        return <CloudSun className="w-6 h-6 text-gray-400" />;
    };

    const getWeatherText = (code) => {
        if (code === 0) return "Clear Sky";
        if (code === 1 || code === 2 || code === 3) return "Partly Cloudy";
        if (code >= 51) return "Rainy";
        return "Cloudy";
    };

    if (locationLoading) return <div className="text-white/50 text-xs flex items-center gap-2"><Loader className="w-3 h-3 animate-spin" /> Weather...</div>;
    if (locationError || !weather) return null;

    return (
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white shadow-lg animate-fade-in">
            <div className="flex items-center gap-2">
                {getWeatherIcon(weather.weathercode)}
                <div>
                    <p className="text-sm font-bold">{Math.round(weather.temperature)}°C</p>
                    <p className="text-[10px] text-gray-300 uppercase tracking-wider">{getWeatherText(weather.weathercode)}</p>
                </div>
            </div>
            <div className="h-6 w-px bg-white/20 mx-1"></div>
            <div className="flex gap-3 text-xs text-gray-300">
                <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> {weather.windspeed}km/h</span>
                {/* Open-Meteo Basic doesn't give humidity in 'current_weather', simplified for now */}
            </div>
        </div>
    );
}
