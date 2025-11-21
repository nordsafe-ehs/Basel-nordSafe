import { Stack, TextField } from "@mui/material";
// @ts-expect-error 123
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

// Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationPickerProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export default function LocationPicker({
  value,
  onChange,
  label,
}: LocationPickerProps) {
  const [position, setPosition] = useState<[number, number]>([
    33.5138, 36.2765,
  ]);

  const fetchAddress = async ([lat, lon]: [number, number]) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      if (data?.display_name) onChange(data.display_name);
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
    }
  };

  const fetchCoords = async (query: string) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json`
      );
      const data = await res.json();
      if (data?.[0]) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);
      }
    } catch (err) {
      console.error("Forward geocoding failed:", err);
    }
  };

  function LocationEvents() {
    useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
        setPosition(coords);
        fetchAddress(coords);
      },
    });
    return null;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        ".leaflet-bottom.leaflet-right": {
          display: "none",
        },
      }}
    >
      <TextField
        size="small"
        fullWidth
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => fetchCoords(value)}
      />
      <MapContainer
        // @ts-expect-error 123
        center={position}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: 10 }}
        scrollWheelZoom
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
        <LocationEvents />
      </MapContainer>
    </Stack>
  );
}
