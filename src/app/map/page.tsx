"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOMServer from "react-dom/server";
import Image from "next/image";
import {
  Calendar,
  Flag,
  MapPin,
  Megaphone,
  MessageCircle,
  Plus,
} from "lucide-react";
import AvatarSelector from "@/components/ui/randomized-avatar";
import Description from "@/components/description";
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
        <div className="z-99 fixed bottom-0 h-full w-full lg:h-dvh lg:w-[350px] bg-background p-3">
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

const ReportMarker = () => {
  return (
    <Image
      src="/report_marker.png"
      alt="Report marker"
      height={30}
      width={30}
    />
  );
};

const AnnouncementMarker = () => {
  return (
    <Image
      src="/announcement_marker.png"
      alt="Report marker"
      height={30}
      width={30}
    />
  );
};

const FeedbackMarker = () => {
  return (
    <Image
      src="/feedback_marker.png"
      alt="Report marker"
      height={30}
      width={30}
    />
  );
};

const EventMarker = () => {
  return (
    <Image src="/event_marker.png" alt="Report marker" height={30} width={30} />
  );
};

function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

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

      const report = document.createElement("div");
      const event = document.createElement("div");
      const announcement = document.createElement("div");
      const feedback = document.createElement("div");

      report.innerHTML = ReactDOMServer.renderToString(<ReportMarker />);
      event.innerHTML = ReactDOMServer.renderToString(<EventMarker />);
      announcement.innerHTML = ReactDOMServer.renderToString(
        <AnnouncementMarker />,
      );
      feedback.innerHTML = ReactDOMServer.renderToString(<FeedbackMarker />);

      // TEST_COORDS.map((coord) => {
      // new mapboxgl.Marker({ element: report.firstChild as HTMLElement })
      // .setLngLat([coord.longitude,coord.latitude])
      // .addTo(mapRef.current!);
      // })

      new mapboxgl.Marker({ element: report.firstChild as HTMLElement })
        .setLngLat([TEST_COORDS[0].longitude, TEST_COORDS[0].latitude])
        .addTo(mapRef.current!);
      new mapboxgl.Marker({ element: event.firstChild as HTMLElement })
        .setLngLat([TEST_COORDS[1].longitude, TEST_COORDS[1].latitude])
        .addTo(mapRef.current!);
      new mapboxgl.Marker({ element: announcement.firstChild as HTMLElement })
        .setLngLat([TEST_COORDS[2].longitude, TEST_COORDS[2].latitude])
        .addTo(mapRef.current!);
      new mapboxgl.Marker({ element: feedback.firstChild as HTMLElement })
        .setLngLat([TEST_COORDS[3].longitude, TEST_COORDS[3].latitude])
        .addTo(mapRef.current!);

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
