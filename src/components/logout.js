'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/middleware/auth';
import { logAction } from '@/lib/logAction';
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const token = getCookie('token');
    // console.log(token);
    const user = verifyToken(token);
    console.log(user);
    await logAction("logout", user?.id, "user");
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
