import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log("Access Token:", token?.accessToken); // should not be undefined
    if (!token || !token.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails,statistics",
          myRating: "like",
          maxResults: 1000,
        },
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    // const allVideos = res.data.items || [];

    // // Filter videos where title contains "erp" (case-insensitive)
    // const filteredVideos = allVideos.filter((video: any) =>
    //   video.snippet?.title?.toLowerCase().includes("erp")
    // );

    return NextResponse.json({ items: res.data.items || [] });
  } catch (err: any) {
    console.error(
      "YouTube Liked Videos API Error:",
      err.response?.data || err.message
    );
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
