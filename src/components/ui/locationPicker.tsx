import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

interface LocationPickerProps {
  onChange?: (coords: { lng: number; lat: number }) => void;
}

export default function LocationPicker({ onChange }: LocationPickerProps) {
  const [coords, setCoords] = useState<{ lng: number; lat: number } | null>(
    null,
  );
  const [showMap, setShowMap] = useState(false);

  const handleFindLocation = () => setShowMap(true);

  useEffect(() => {
    if (coords && onChange) {
      onChange(coords);
    }
  }, [coords, onChange]);

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-sm">Where did it happen?</span>

      <Button
        className="flex flex-row justify-start w-full h-[45px] p-[10px] text-sm"
        variant="outline"
        size="sm"
        onClick={handleFindLocation}
      >
        <MapPin size={16} />
        {coords
          ? `(${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)})`
          : "Find location"}
      </Button>

      {showMap && (
        <div className="w-full h-[400px] mt-2 rounded-xl overflow-hidden">
          <MapBox onSelect={setCoords} />
        </div>
      )}
    </div>
  );
}

function MapBox({
  onSelect,
}: {
  onSelect: (coords: { lng: number; lat: number }) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lng = pos.coords.longitude;
        const lat = pos.coords.latitude;

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [lng, lat],
          zoom: 14,
        });

        markerRef.current = new mapboxgl.Marker({ color: "#3b82f6" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);

        onSelect({ lng, lat });

        mapRef.current.on("click", (e) => {
          const { lng, lat } = e.lngLat;
          markerRef.current?.setLngLat([lng, lat]);
          onSelect({ lng, lat });
        });

        mapRef.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
            showUserHeading: true,
          }),
        );
      },
      (err) => {
        console.error("Geolocation error:", err);
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [0, 0],
          zoom: 2,
        });
      },
    );

    return () => {
      mapRef.current?.remove();
    };
  }, [onSelect]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
