
import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Вход' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Регистрация' }} />
    </Stack.Navigator>
  );
}
