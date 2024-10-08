import { defineEventHandler, getCookie, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'session');
  console.log('Session cookie:', session);
  console.log('Middleware called for:', event.node.req.url);

  // Cek apakah pengguna berada di halaman login
  const isLoginPage = event.node.req.url === '/login';
  
  // Cek metode permintaan
  const isPostRequest = event.node.req.method === 'POST' && event.node.req.url === '/api/auth';

  // Jika tidak ada sesi dan bukan di halaman login dan bukan permintaan POST ke /api/auth, redirect ke login
  if (!session && !isLoginPage && !isPostRequest) {
    console.log('Redirecting to login, no session found');
    return sendRedirect(event, '/login');
  }

  // Jika ada sesi dan di halaman login, redirect ke home
  if (session && isLoginPage) {
    console.log('Redirecting to home, session found');
    return sendRedirect(event, '/home');
  }
});
