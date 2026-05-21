import { NextResponse } from "next/server";
import { getSiteMetadata } from "@/lib/settings";

export async function GET() {
  const meta = await getSiteMetadata();
  return NextResponse.json({ settings: meta });
}
