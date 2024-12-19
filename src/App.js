import React from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Login from './components/Login';
import AuthenticatedApp from './AuthenticatedApp';
import Footer from './components/Footer'

const App = () => {
  const { user } = useAuth();

  console.log("User in App:", user);

  return user ? <AuthenticatedApp /> : <Login />;
};

const WrappedApp = () => (
  <AuthProvider>
    <App />
    <Footer />
  </AuthProvider>
);

export default WrappedApp;
