import { NextResponse } from "next/server";

// Define the shape of the statistics object we expect from the YouTube API
interface YouTubeStatistics {
  viewCount: string;
  subscriberCount: string;
  videoCount: string;
}

// Define the shape of the data we'll return from our API
export interface ChannelStats {
  views: string;
  subscribers: string;
  videos: string;
}

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  const URL = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    const stats: YouTubeStatistics = data.items[0].statistics;

    const channelStats: ChannelStats = {
      subscribers: stats.subscriberCount,
      views: stats.viewCount,
      videos: stats.videoCount,
    };

    return NextResponse.json(channelStats);
  } catch (error) {
    // A more specific error handling
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
