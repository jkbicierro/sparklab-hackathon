"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function Map() {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row">
        {/* Sidebar */}
        <div className="fixed bottom-0 h-[70px] w-full lg:h-dvh lg:w-[350px] bg-background"></div>

        {/* Map */}
        <div className="h-dvh w-full">
          <MapBox />
        </div>
      </div>
    </>
  );
}

function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLDivElement,
        center: [123.1947, 13.6231],
        zoom: 16,
        attributionControl: false,
        minZoom: 12,
        maxZoom: 16,

        dragPan: true, // Enable or disable drag panning
        scrollZoom: true, // Disable scroll zoom
        boxZoom: true, // Enable box zoom
        dragRotate: false, // Enable drag rotation
        keyboard: false, // Enable keyboard controls
        touchZoomRotate: false, // Enable touch zoom & rotation
      });

      // Wait for map to load before adding markers
      mapRef.current.on("load", () => {
        new mapboxgl.Marker()
          .setLngLat([123.1947, 13.6231])
          .addTo(mapRef.current as mapboxgl.Map);
      });
    }

    // Cleanup on unmount
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={mapContainerRef} className="h-dvh w-full" />;
}
