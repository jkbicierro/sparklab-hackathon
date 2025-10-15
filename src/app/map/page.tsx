"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";
import Feed from "../feed/page";

const TEST_COORDS = [
  { longitude: 123.183874, latitude: 13.631545 },
  { longitude: 123.1962, latitude: 13.6401 },
  { longitude: 123.1715, latitude: 13.6209 },
  { longitude: 123.1908, latitude: 13.6153 },
  { longitude: 123.1764, latitude: 13.6467 },
];

export default function Map() {
  return (
    <>
      <div className="flex flex-col-reverse h-screen w-screen items-center justify-center lg:flex-row">
        {/* Sidebar */}
        {/* <div className="z-99 fixed bottom-0 h-[70px] w-full lg:h-dvh lg:w-[350px] bg-background"> */}
        <div className="z-99 fixed left-0 bottom-0 h-full w-full lg:h-dvh lg:w-[350px] bg-background p-3">
          <Feed />
        </div>

        {/* Map */}
        <div className="flex-1 h-[100dvh] w-[100dvw]">
          <MapBox />
        </div>
      </div>
    </>
  );
}

function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    navigator.geolocation.getCurrentPosition((pos) => {
      const longitude = pos.coords.longitude;
      const latitude = pos.coords.latitude;

      console.log(longitude);
      console.log(latitude);

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLDivElement,
        style: "mapbox://styles/mapbox/standard",
        center: [longitude, latitude],
        zoom: 16,
      });

      TEST_COORDS.map((coord) => {
        new mapboxgl.Marker({ color: "black", rotation: 45 })
          .setLngLat([coord.longitude, coord.latitude])
          .addTo(mapRef.current!);
      });

      mapRef.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
      );

      // TEST_COORDS.forEach(coords => {
      // mapRef.current.on('load', () => {
      //   new mapboxgl.Marker({ color: 'black', rotation: 45 })
      // .setLngLat([123.00,13.00])
      // .addTo(mapRef.current!);
      // })
      // });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>;
}
