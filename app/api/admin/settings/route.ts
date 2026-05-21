import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSiteMetadata, saveSiteMetadata } from "@/lib/settings";

export async function GET() {
  const meta = await getSiteMetadata();
  return NextResponse.json({ metadata: meta });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    await saveSiteMetadata(body);
    const meta = await getSiteMetadata();
    return NextResponse.json({ metadata: meta });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to save metadata", detail: message }, { status: 500 });
  }
}
