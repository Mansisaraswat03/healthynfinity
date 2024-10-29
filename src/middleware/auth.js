// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// export function middleware(req) {
//   const token = req.cookies.get('token'); 
  
//   if (req.nextUrl.pathname !== '/' && !token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   try {
//     if (token) {
//       const user = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = user; 
//     }
//   } catch (error) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next|favicon.ico).*)'], 
// };


// src/middleware/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (user) => {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; 
  } catch (error) {
    return null;
  }
}