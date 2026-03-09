// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import api from './lib/axios';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login') {
    return NextResponse.next();
  }

  try {
    const response = await api.get('/login/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
    });

    if (response.status == 200) NextResponse.next()

    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};