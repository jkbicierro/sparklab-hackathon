"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";

const TEST_COORDS = [
  { longitude: 123.183874, latitude: 13.631545 },
  { longitude: 123.1962, latitude: 13.6401 },
  { longitude: 123.1715, latitude: 13.6209 },
  { longitude: 123.1908, latitude: 13.6153 },
  { longitude: 123.1764, latitude: 13.6467 },
];
import {
  Calendar,
  Flag,
  MapPin,
  Megaphone,
  MessageCircle,
  Plus,
} from "lucide-react";
import Image from "next/image";
import AvatarSelector from "@/components/ui/randomized-avatar";
import Description from "@/components/description";

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

function Feed() {
  const TABS = [
    {
      key: 0,
      icon: <Plus />,
      name: "Post",
      fontclr: "--post-txt",
      bgclr: "--post-bg",
    },
    {
      key: 1,
      icon: <Flag />,
      name: "Reports",
      fontclr: "--report-txt",
      bgclr: "--report-bg",
    },
    {
      key: 2,
      icon: <Megaphone />,
      name: "Announcements",
      fontclr: "--announcement-txt",
      bgclr: "--announcement-bg",
    },
    {
      key: 3,
      icon: <Calendar />,
      name: "Events",
      fontclr: "--event-txt",
      bgclr: " --event-bg",
    },
    {
      key: 4,
      icon: <MessageCircle />,
      name: "Feedback",
      fontclr: " --feedback-txt",
      bgclr: "--feedback-bg",
    },
  ];

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="absolute  m-5">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full absolute bottom-30 right-0"
          style={{
            color: `var(--feedback-bg)`,
            backgroundColor: `var(--feedback-txt)`,
          }}
        >
          <Map />
        </div>
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full absolute bottom-0 right-0"
          style={{
            color: `var(--post-bg)`,
            backgroundColor: `var(--post-txt)`,
          }}
        >
          <Plus />
        </div>
      </div>
      <div className="mb-2">
        <span className="text-primary text-2xl font-semibold ">Feed</span>
      </div>

      {/* LOCATION */}
      <div className="flex gap-1 p-3 items-center bg-accent text-accent-foreground/40 rounded-full">
        <MapPin size={16} />
        <span>Current Location</span>
      </div>
      {/* TABS */}
      <div className="flex gap-3 py-5 w-full lg:overflow-x-scroll">
        {TABS.map((tab) => (
          <div
            key={tab.key}
            className={`font-medium p-3 rounded-full flex gap-3 hover:opacity-80 transition cursor-pointer `}
            style={{
              color: `var(${tab.fontclr})`,
              backgroundColor: `var(${tab.bgclr})`,
            }}
          >
            {tab.icon}
            {tab.name}
          </div>
        ))}
      </div>

      {/* POSTS */}
      <div className="border rounded-md p-3">
        <div className="flex items-center justify-between  mb-4">
          <div className="flex flex-col  gap-2">
            <div className="flex gap-3 items-center ">
              <AvatarSelector />
              <div className="flex flex-col  ">
                <span className="font-medium text-sm">
                  {/* {user?.username} */} User
                </span>
                <span className="text-xs text-zinc-400">
                  {/* {getRelativeTime(meme.createdAt)} */} Recently
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs lg:text-sm text-justify ">
                {/* <Description description={post.description ?? ""} /> */}
                <Description
                  description={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum leo eget velit ultricies, in porta libero consectetur. Maecenas placerat rutrum mi nec pulvinar. "
                  }
                />
              </span>
            </div>
            <div className="flex gap-3">
              {/* Location */}
              <div
                className="flex items-center gap-2 p-2 px-3 rounded-full"
                style={{
                  color: `var(--location-txt)`,
                  backgroundColor: `var(--location-bg)`,
                }}
              >
                <MapPin size={16} />
                <span className="text-sm">Naga City</span>
              </div>
              {/* Type */}
              <div
                className="flex items-center gap-2 p-2 px-3 rounded-full"
                style={{
                  color: `var(--location-txt)`,
                  backgroundColor: `var(--location-bg)`,
                }}
              >
                <span className="text-sm">Report</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
