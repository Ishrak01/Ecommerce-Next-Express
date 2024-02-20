import { NextResponse } from 'next/server';

export  function middleware(request) {
  // Check for the token on the client side
  const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).value : null;
  
  if (!token) {
    // Redirect to the login page if the token is not present
    return NextResponse.redirect(new URL('/customer/Login', request.url));
  }

  // Continue with the request if the user is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/customer/cart']
};
