import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST() {
  try {
    const existing = await prisma.user.findFirst();
    if (existing) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 409 });
    }

    const username = "admin";
    const password = "admin123";
    const hashed = await hashPassword(password);

    await prisma.user.create({
      data: { username, password: hashed, role: "admin" },
    });

    return NextResponse.json({
      message: "Admin created",
      credentials: { username, password },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to seed admin", detail: message }, { status: 500 });
  }
}
