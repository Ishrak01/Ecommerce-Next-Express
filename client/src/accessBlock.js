
import { useRouter } from 'next/navigation';

const isLocalStorageAvailable =
  typeof window !== "undefined" && window.localStorage;

const accessBlock = (WrappedComponent) => {
  const WithAccessBlock = (props) => {
    const router = useRouter();
    const token = isLocalStorageAvailable ? localStorage.getItem('auth') : null;

    if (token) {
      router.push('/');
    }

    return <WrappedComponent {...props} />;
  };

  return WithAccessBlock;
};

export default accessBlock;
