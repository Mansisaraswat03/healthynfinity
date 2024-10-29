"use server"
import { NextResponse } from 'next/server';
export async function middleware(req) {
  const token = req.cookies.get('token');

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/logs'], 
};
