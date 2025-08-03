import Image from "next/image";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

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



async function getUploadsPlaylistId() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  return data.items[0].contentDetails.relatedPlaylists.uploads;
}


async function getVideos(playlistId: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  return data.items;
}


export default async function YouTubeVideosPage() {
  const playlistId = await getUploadsPlaylistId();
  const videos = await getVideos(playlistId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Channel Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video: Video) => (
          <div key={video.id} className="shadow p-4 rounded-lg border">
            <Image
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full"
              width={800}
              height={800}
            />
            <h2 className="text-lg font-semibold mt-2">
              {video.snippet.title}
            </h2>
            <p className="text-sm text-gray-600">
              {video.snippet.publishedAt.slice(0, 10)}
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
              target="_blank"
              className="text-blue-600 mt-2 inline-block"
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}