import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.sankavollerei.com/anime/winbu";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const post = searchParams.get("post");
  const nume = searchParams.get("nume");
  const type = searchParams.get("type");

  if (!post || !nume || !type) {
    return NextResponse.json(
      { error: "Missing required parameters: post, nume, type" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${BASE_URL}/server?post=${post}&nume=${nume}&type=${type}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch server embed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
