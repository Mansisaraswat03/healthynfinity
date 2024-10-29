'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
// import { verifyToken } from '@/middleware/auth';
import { logAction } from '@/lib/logAction';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // const token = document.cookie.split('=')[1];
    // const user = verifyToken(token);
    await logAction('logout');
    document.cookie = "token=; Max-Age=0; path=/;";
    router.push('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4'
    >
      Logout
    </button>
  );
};

export default Logout;
