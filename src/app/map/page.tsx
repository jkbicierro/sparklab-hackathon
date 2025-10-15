"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Button } from "@/components/ui/button";

export default function Map() {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row">
        {/* Sidebar */}
        <div className="fixed bottom-0 h-[70px] w-full lg:h-[100dvh] lg:w-[350px] bg-white">
          <div></div>
        </div>

        {/* Map */}
        <div className="flex-1 h-[100dvh] w-full">
          <MapBox />
        </div>
      </div>
    </>
  );
}

function getCurrentLocation(): Promise<{
  latitude: number;
  longitude: number;
  accuracy: number;
}> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Location permission denied by user."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information unavailable."));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out."));
            break;
          default:
            reject(new Error("An unknown geolocation error occurred."));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  });
}

function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [locationError, setLocationError] = React.useState<string | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

    async function initMap() {
      try {
        const location = await getCurrentLocation();
        const { latitude, longitude } = location;
        setLocationError(null);

        if (mapRef.current) {
          mapRef.current.remove();
        }

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current as HTMLDivElement,
          center: [longitude, latitude],

          zoom: 16,
          minZoom: 12,
          maxZoom: 16,
          attributionControl: false,

          dragPan: true,
          scrollZoom: true,
          boxZoom: true,
          dragRotate: false,
          keyboard: false,
          touchZoomRotate: false,
        });

        // Marker
        if (markerRef.current) markerRef.current.remove();
        markerRef.current = new mapboxgl.Marker({ color: "#007AFF" })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current!);
      } catch (err) {
        console.log(err);
        setLocationError(
          err instanceof Error ? err.message : "Failed to get location",
        );
      }
    }

    initMap();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  if (locationError) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center">
        {/*  */}
        <div className="flex flex-col items-center gap-3">
          <h5>Location Access Required</h5>
          <p className="text-slate-400">{locationError}</p>
          <Button onClick={() => window.location.reload()}>
            Enable Location
          </Button>
        </div>
      </div>
    );
  }

  return <div ref={mapContainerRef} className="h-dvh w-full" />;
}
