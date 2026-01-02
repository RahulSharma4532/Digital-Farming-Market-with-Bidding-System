import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({
        coords: null,
        city: 'Detecting Location...',
        error: null,
        loading: true,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation(prev => ({ ...prev, error: "Geolocation is not supported by your browser.", loading: false }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Reverse Geocoding using OpenStreetMap (Nominatim)
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();

                    const city = data.address.city || data.address.town || data.address.village || data.address.county || "Unknown Location";

                    setLocation({
                        coords: { latitude, longitude },
                        city: city,
                        error: null,
                        loading: false
                    });
                } catch (err) {
                    console.error("Error fetching city name:", err);
                    setLocation({
                        coords: { latitude, longitude },
                        city: "Location Found",
                        error: null, // Coordinates allow weather to work even if city name fails
                        loading: false
                    });
                }
            },
            (error) => {
                let errorMessage = "Unable to retrieve your location";
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = "Location permission denied";
                }
                setLocation(prev => ({ ...prev, error: errorMessage, loading: false }));
            }
        );
    }, []);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};
