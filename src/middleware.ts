import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah route adalah /todolist/[id]
  const todoMatch = pathname.match(/^\/todolist\/([a-zA-Z0-9-]+)$/);

  if (todoMatch) {
    const code = todoMatch[1];

    // URL API untuk memeriksa data
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    try {
      const response = await fetch(`${API_URL}/checklist/${code}`, {
        method: "GET",
        headers: {
          "x-api-key": API_KEY || "",
        },
      });

      if (response.ok) {
        const result = await response.json();

        // Pastikan `data` ada dalam respons API
        if (result?.data) {
          return NextResponse.next(); // Data valid, lanjutkan ke halaman
        }
      }

      // Jika respons tidak valid atau `data` tidak ditemukan
      return NextResponse.rewrite(new URL("/404", request.url));
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.rewrite(new URL("/404", request.url));
    }
  }

  // Jika bukan route todolist, lanjutkan
  return NextResponse.next();
}


export const config = {
  matcher: ["/todolist/:path*"],
};