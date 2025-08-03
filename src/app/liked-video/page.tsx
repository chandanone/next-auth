"use client";

import { useEffect, useState } from "react";

type Video = {
  id: string;
  snippet: {
    title: string;
    description: string;
    tags?: string[];
    channelTitle: string;
    thumbnails: { default: { url: string } };
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
  };
};

export default function LikedVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "views" | "az" | "za">("date");
  const [filterByLetter, setFilterByLetter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/liked-video");
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err) {
        console.error("Failed to fetch liked videos", err);
      }
    };

    fetchVideos();
  }, []);

  const filtered = videos.filter((video) => {
    const title = video.snippet.title.toLowerCase();
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      title.includes(term) ||
      video.snippet.description.toLowerCase().includes(term) ||
      video.snippet.channelTitle.toLowerCase().includes(term) ||
      video.snippet.tags?.some((tag) => tag.toLowerCase().includes(term));

    const firstChar = title.charAt(0).toUpperCase();

    const matchesFilter =
      filterByLetter === "All" ||
      (filterByLetter === "0-9"
        ? /^[0-9]/.test(firstChar)
        : firstChar === filterByLetter);

    return matchesSearch && matchesFilter;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "views":
        return (
          Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
        );
      case "az":
        return a.snippet.title.localeCompare(b.snippet.title);
      case "za":
        return b.snippet.title.localeCompare(a.snippet.title);
      case "date":
      default:
        return (
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
        );
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = sorted.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  const letters = [
    "All",
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0-9",
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liked YouTube Videos</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search title, description, tags, channel..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded w-full md:max-w-md"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="border px-4 py-2 rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="views">Sort by Views</option>
          <option value="az">Sort A–Z</option>
          <option value="za">Sort Z–A</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => {
              setFilterByLetter(letter);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 border rounded ${
              filterByLetter === letter ? "bg-blue-600 text-white" : ""
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-4">
        {paginated.map((video) => (
          <li key={video.id} className="border rounded p-3 shadow-sm">
            <h2 className="font-semibold">{video.snippet.title}</h2>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === idx + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
