'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';


type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics?: {
    viewCount?: string;
  };
};


export default function Dashboard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          setError('Unexpected response format');
          console.error('Invalid response:', data);
        }
      } catch (err) {
        setError('Failed to fetch videos');
        console.error(err);
      }
    };

    fetchVideos();
  }, []);

   if (error) return <p className="text-red-500">{error}</p>;
  if (!videos.length) return <p>Loading videos...</p>;


  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <div key={idx} className="border rounded p-4 shadow hover:shadow-lg transition">
            <a
              href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full mb-2 rounded"
                width={300}
                height={300}
              />
              <h2 className="font-semibold text-lg">{video.snippet.title}</h2>
              <div className='flex justify-between'>
                 <p className="text-sm text-gray-600 mb-1">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>
              <div className='flex justify-end space-x-1'>
                   <p className="text-sm text-gray-600">
                {video.statistics?.viewCount
                  ? `${Number(video.statistics.viewCount).toLocaleString()} views`
                  : 'No views info'}
              </p>
               <p className="text-sm text-gray-600">
                💬 {video.statistics?.commentCount
                    ? `${Number(video.statistics.commentCount).toLocaleString()} comments`
                    : 'No comments'}
              </p>
              </div> 
              </div>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
