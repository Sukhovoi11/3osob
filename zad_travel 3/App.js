
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { TripsProvider } from './context/TripsContext';
import MainNavigator from './navigation/MainNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  return (
    <AuthProvider>
      <TripsProvider>
        <Navigator />
      </TripsProvider>
    </AuthProvider>
  );
}

function Navigator() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
