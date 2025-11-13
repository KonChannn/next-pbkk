import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Cek apakah user sudah login dengan mengecek token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Daftar path yang memerlukan autentikasi
  const authRequiredPaths = [
    '/web',
    '/dashboard',
    // Tambahkan path lain yang memerlukan autentikasi
  ];

  // Daftar path yang hanya bisa diakses ketika tidak login
  const authRestrictedPaths = [
    '/auth/login',
    '/auth/register'
  ];

  // Cek apakah path saat ini memerlukan autentikasi
  const isAuthRequired = authRequiredPaths.some(path => 
    pathname.startsWith(path)
  );

  // Cek apakah path saat ini dibatasi untuk user yang sudah login
  const isAuthRestricted = authRestrictedPaths.some(path => 
    pathname.startsWith(path)
  );

  // Jika user sudah login dan mencoba mengakses halaman auth
  if (token && isAuthRestricted) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika user belum login dan mencoba mengakses halaman yang dilindungi
  if (!token && isAuthRequired) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};