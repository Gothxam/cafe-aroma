import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUser && password === adminPassword) {
        const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
        const session = await encrypt({ user: { username }, expires });

        (await cookies()).set("session", session, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
