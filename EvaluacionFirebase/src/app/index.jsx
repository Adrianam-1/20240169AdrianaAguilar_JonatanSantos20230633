import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Loading } from '../components/Loading';

export default function Index() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <Loading fullscreen />;
  }

  return <Redirect href={user ? '/dashboard' : '/login'} />;
}
