"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOMServer from "react-dom/server";
import { createPortal } from "react-dom";
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
import { Feed } from "@/components/block/feed";
import { Post } from "@/lib/model/post";
import MarkerDrawer from "@/components/block/markerDrawer";

const keys = [
  {
    key: 0,
    name: "All",
  },
  {
    key: 1,
    name: "Report",
  },
  {
    key: 2,
    name: "Announcement",
  },
  {
    key: 3,
    name: "Event",
  },
  {
    key: 4,
    name: "Feedback",
  },
];

export default function MapPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState<number>(0);

  useEffect(() => {
    requestLocationPermission()
    async function loadPosts() {
      try {
        const res = await fetch("/api/posts");

        if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);

        const data = (await res.json()) as { posts: Post[] };

        setPosts(data.posts ?? []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  
  }, []);

  function requestLocationPermission() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location permission granted!");
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        if (error.code === error.PERMISSION_DENIED) {
          alert("Please allow location access in your browser settings.");
        }
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="flex flex-col-reverse h-screen w-screen items-center justify-center lg:flex-row">
        {/* Sidebar */}
        <div className="z-2 fixed left-0 bottom-0 h-[400px] lg:h-full w-full lg:w-[400px] bg-background p-5  rounded-t-4xl lg:rounded-none">
          <Feed posts={posts} activeKey={activeKey} setActiveKey={setActiveKey} />
        </div>

        {/* Map */}
        <div className="flex-1 h-[100dvh] w-[100dvw]">
          <MapBox posts={posts} activeKey={activeKey}/>
        </div>
      </div>
    </>
  );
}

function MapBox({ posts, activeKey }: { posts: Post[], activeKey: number }) {
  console.log(activeKey);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [post, setSelectedMarker] = useState<Post | null>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!posts) {
      console.log("error");
      return
    }
    setMapLoading(true);
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    navigator.geolocation.getCurrentPosition((pos) => {
      const longitude = pos.coords.longitude;
      const latitude = pos.coords.latitude;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLDivElement,
        style: "mapbox://styles/mapbox/standard",
        center: [longitude, latitude],
        zoom: 14,
      });

      mapRef.current.on("load", () => {
        setMapLoading(false);
      });
    });
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  async function handleSelectMarker(id: string | null) {
    const selectedMarker = posts.filter((post) => post.post_id === id);
    setSelectedMarker(selectedMarker[0]);
    setOpen(true);
  }

  return (
    <>
      <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>
      {!mapLoading && (
        posts.map((post) => {
          if (post.type == keys[activeKey].name || keys[activeKey].name == "All") {
            return (
              <Marker
                key={post.post_id}
                id={post.post_id}
                map={mapRef.current}
                handleSelectMarker={handleSelectMarker}
                coords={{longitude: post.longitude, latitude: post.latitude}}
                type={post.type}
              />
            );
          }
        }))}
  
      <MarkerDrawer post={post} open={open} setOpen={setOpen} />
    </>
  );
}

interface MarkerProps {
  id: string;
  map: mapboxgl.Map | null;
  coords: {
    longitude: number | null;
    latitude: number | null;
  };
  handleSelectMarker: (id: string | null) => void;
  type: string | null;
}

function Marker({ id, map, coords, handleSelectMarker, type }: MarkerProps) {
  const { longitude, latitude } = coords;

  const markerEl = document.createElement("div");
  markerEl.addEventListener("click", () => handleSelectMarker(id));

  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const contentRef = useRef(markerEl);
  const markerType = getMarkerType(type!);

  useEffect(() => {
    if (!map) return;

    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([longitude!, latitude!])
      .addTo(map);

    return () => {
      markerRef.current?.remove();
    };
  }, [map, longitude, latitude, type]);

  function getMarkerType(type: string | undefined) {
    switch (type) {
      case "Report":
        return (
          <Image
            src="/report_marker.png"
            alt="Report marker"
            height={30}
            width={30}
          />
        );
      case "Event":
        return (
          <Image
            src="/event_marker.png"
            alt="Report marker"
            height={30}
            width={30}
          />
        );
      case "Announcement":
        return (
          <Image
            src="/announcement_marker.png"
            alt="Report marker"
            height={30}
            width={30}
          />
        );
      case "Feedback":
        return (
          <Image
            src="/feedback_marker.png"
            alt="Report marker"
            height={30}
            width={30}
          />
        );
    }
  }

  return <>{createPortal(markerType, contentRef.current)}</>;
}
