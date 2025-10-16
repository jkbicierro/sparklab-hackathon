"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Feed } from "@/components/block/feed";
import { Post } from "@/lib/model/post";
import MarkerDrawer from "@/components/block/markerDrawer";
import { Ads } from "@/lib/model/ads";

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
  const [isFull, setFull] = useState(false);
  const [activeKey, setActiveKey] = useState<number>(0);

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="w-full h-screen  flex items-center justify-center ">
        <Image
          src={"/assets/vibebayan-logo.png"}
          alt="VibeBayan Logo"
          width={700}
          height={700}
          className="w-[120px] h-[120px] animate-pulse"
        />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col-reverse h-screen w-screen items-center justify-center lg:flex-row animate-in fade-in-0 duration-500">
        {/* Sidebar */}
        <div
          className={`z-5 fixed left-0 bottom-0 ${isFull ? "h-full" : "h-[200px]"} lg:h-full w-full lg:w-[400px] bg-background p-5  ${isFull ? "rounded-none" : "rounded-t-4xl"} lg:rounded-none   transition-all duration-500 ease-in-out`}
        >
          <div className="flex justify-center ">
            <div
              className="p-1 bg-slate-200 rounded-full flex flex-col w-1/4 items-center cursor-pointer hover:bg-slate-300 transition lg:hidden"
              onClick={() => setFull((prev) => !prev)}
            />
          </div>
          <Feed
            posts={posts}
            isFull={isFull}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          />
        </div>

        {/* Map */}
        <div className="flex-1 h-[100dvh] w-[100dvw]">
          <MapBox posts={posts} activeKey={activeKey} />
        </div>
      </div>
    </>
  );
}

function MapBox({ posts, activeKey }: { posts: Post[]; activeKey: number }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [post, setSelectedMarker] = useState<Post | null>(null);
  const [selectedAD, setSelectedAd] = useState<Ads |null>(null);
  const [ads, setAds] = useState<Ads[] | null>(null)
  const [mapLoading, setMapLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string | null>("");

  useEffect(() => {
    if (!posts) {
      console.log("error");
      return;
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
        minZoom: 8,
        maxZoom: 18,
        attributionControl: false,
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

      mapRef.current.on("load", () => {
        setMapLoading(false);
      });
    });
    return () => {
      mapRef.current?.remove();

      async function getAds() {
        const res = await fetch("/api/ads")

        if (!res.ok) throw Error

        const data = (await res.json()) as { advertisements: Ads[]}
        console.log(data.advertisements);
        
        setAds(data!.advertisements);
      }

      getAds();

    };
  }, [posts]);

  async function handleSelectMarker(id: string | null) {
    const selectedMarker = posts.filter((post) => post.post_id === id);
    setSelectedMarker(selectedMarker[0]);
    setType("post")
    setOpen(true);
  }

  async function handleSelectAd(id: string | null) {
    const thisAd = ads!.filter((ad) => ad.ads_id === id);
    setSelectedAd(thisAd[0]);
    console.log(thisAd);
    setType("ads");
    setOpen(true);
  }

  return (
    <>
      <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>
      {!mapLoading &&
        posts.map((post) => {
          if (
            post.type == keys[activeKey].name ||
            keys[activeKey].name == "All"
          ) {
            return (
              <Marker
                key={post.post_id}
                id={post.post_id}
                map={mapRef.current}
                handleSelectMarker={handleSelectMarker}
                imageLink={null}
                coords={{ longitude: post.longitude, latitude: post.latitude }}
                type={post.type}
              />
            );
          }
        })}
        {!mapLoading && ads!.length > 0 && 
        ads?.map((ad) => {
          return (
                <Marker
                  key={ad.ads_id}
                  id={ad.ads_id}
                  map={mapRef.current}
                  handleSelectMarker={handleSelectAd}
                  imageLink={ad.image_url}
                  coords={{ longitude: ad.longitude, latitude: ad.latitude }}
                  type={"Business"}
                />
              );
        })
        }

      <MarkerDrawer post={post} ad={selectedAD} open={open} setOpen={setOpen} type={type} />
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
  imageLink: string | null;
  type: string | null;
}

function Marker({ id, map, coords, handleSelectMarker, imageLink, type }: MarkerProps) {
  const { longitude, latitude } = coords;

  const markerEl = document.createElement("div");
  markerEl.addEventListener("click", () => handleSelectMarker(id));
  markerEl.className = "cursor-pointer";

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
      case "Business":
        return (
          <Image
            src={`https://hucsiehmwkqjkfxwxnfn.supabase.co/storage/v1/object/public/ads/${imageLink}`}
            alt="Report marker"
            height={40}
            width={40}
            className="rounded-full border-[2px] border-gray-700"
          />
        );
    }
  }

  return <>{createPortal(markerType, contentRef.current)}</>;
}
