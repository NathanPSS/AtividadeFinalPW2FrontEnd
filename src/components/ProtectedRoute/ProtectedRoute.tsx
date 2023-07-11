import { Route, Navigate, Routes } from 'react-router-dom';

export function ProtectedRoute({ path, element }) {
  // Check if the token exists in localStorage
  const token = localStorage.getItem('token');

  // Check if the token exists
  if (!token) {
    // Redirect to the login page or any other route
    return <Navigate to="/login" />;
  }

  // Render the protected route component
  return <Routes><Route path={path} element={element} /></Routes>
}