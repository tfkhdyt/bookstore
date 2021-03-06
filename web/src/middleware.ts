import { NextRequest, NextResponse } from 'next/server';

const Middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/books';
    return NextResponse.redirect(url);
  }
};

export default Middleware;
