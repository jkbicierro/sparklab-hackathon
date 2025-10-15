"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOMServer from "react-dom/server";
import Image from "next/image";
import { Feed } from "@/components/block/feed";
import { Post } from "@/lib/model/post";

const TEST_COORDS = [
  { longitude: 123.183874, latitude: 13.631545 },
  { longitude: 123.1962, latitude: 13.6401 },
  { longitude: 123.1715, latitude: 13.6209 },
  { longitude: 123.1908, latitude: 13.6153 },
  { longitude: 123.1764, latitude: 13.6467 },
];

export default function MapPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/posts");

        if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);

        const data = (await res.json()) as { posts: Post[] };

        setPosts(data.posts ?? []);
      } catch (err) {
        console.log(err);
      }
    }
    loadPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse h-screen w-screen items-center justify-center lg:flex-row">
        {/* Sidebar */}
        <div className="z-99 fixed left-0 bottom-0 h-[400px] lg:h-full w-full lg:w-[400px] bg-background p-5  rounded-t-4xl lg:rounded-none">
          <Feed posts={posts} />
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
        minZoom: 12,
        maxZoom: 18,
        attributionControl: false,
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
