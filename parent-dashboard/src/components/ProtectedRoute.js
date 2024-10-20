import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase hook to track authentication
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; // Your firebase config

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth); // Firebase hook to check if the user is logged in

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  // If user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the children (i.e., protected pages like Overview and Settings)
  return children;
};

export default ProtectedRoute;
