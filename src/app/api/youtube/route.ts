import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  try {
    // 1. Get uploads playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );
    const channelData = await channelRes.json();
    const playlistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. Get videos from playlist
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${apiKey}`
    );
    const videosData = await videosRes.json();

    // 3. Get video statistics (views, likes)
    const videoIds = videosData.items
      .map((item) => item.snippet.resourceId.videoId)
      .join(",");
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`
    );
    const statsData = await statsRes.json();

    // 4. Merge video details with stats
    const finalData = videosData.items.map((item, index) => ({
      ...item,
      statistics: statsData.items[index]?.statistics || {},
    }));

    return NextResponse.json(finalData);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
