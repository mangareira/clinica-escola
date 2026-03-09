// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === '/login';
  const dashboardUrl = new URL('/', request.url); 

  const verifyUrl = `${process.env.NEXT_PUBLIC_API_URL}/login/verify`;

  try {
    const response = await fetch(verifyUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
    });

    const isAuthenticated = (await response.json()).message === 'Autenticado';

    if (isLoginPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(dashboardUrl);
      }
      return NextResponse.next();
    }

    if (isAuthenticated) {
      const nextResponse = NextResponse.next();

      const setCookieHeaders = response.headers.getSetCookie
        ? response.headers.getSetCookie()
        : response.headers.get('set-cookie')?.split(',').map(c => c.trim()) || [];

      setCookieHeaders.forEach(cookie => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });

      return nextResponse;
    } else {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
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