import { useEffect, useState } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
        setError(err);
        setCoords({ lat: 28.6139, lon: 77.2090 });
      }
    );
  }, []);

  return { coords, error };
};