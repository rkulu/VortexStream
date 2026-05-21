import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.sankavollerei.com/anime/winbu";

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/home`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (response.ok) {
      return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        apiBaseUrl: BASE_URL,
        responseStatus: response.status
      });
    } else {
      return NextResponse.json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        apiBaseUrl: BASE_URL,
        error: `API returned status ${response.status}`,
        responseStatus: response.status
      }, { status: 503 });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      apiBaseUrl: BASE_URL,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}