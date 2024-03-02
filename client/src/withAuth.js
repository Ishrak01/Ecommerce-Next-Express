import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;


export function withAuth(Component) {
  return function WithAuth(props) {
    const token = isLocalStorageAvailable ?localStorage.getItem('auth'):null
    const router = useRouter();
   
   
    
    
    if (!token) {
      toast.success('You need to Login first!'); // Displays a success message
      router.push('/customer/Login');
      return null;
      
    }


    // Add additional authentication logic if needed, such as token validation or expiration check
    
    return <Component {...props} />;
  };
}
