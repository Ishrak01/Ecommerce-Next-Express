"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function withAuth(Component) {
  return function WithAuth(props) {
    const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;
    const token = isLocalStorageAvailable ? localStorage.getItem('auth') : null;
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        toast.error('You need to login first!');
        router.push('/customer/Login');
      }
    }, [token, router]);
   
    



    // Add additional authentication logic if needed, such as token validation or expiration check
    
    return <Component {...props} router={router} />;
  };
}
