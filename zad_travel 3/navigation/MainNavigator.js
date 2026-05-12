
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import TripListScreen from '../screens/TripListScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import AddTripScreen from '../screens/AddTripScreen';
import FilterTripsScreen from '../screens/FilterTripsScreen';
import MapScreen from '../screens/MapScreen';
import AboutScreen from '../screens/AboutScreen';
import HitsScreen from '../screens/HitsScreen';
import DojazdScreen from '../screens/DojazdScreen';
import HotelsScreen from '../screens/HotelsScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TripStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="TripList" component={TripListScreen} options={{ title: 'Moje podróże' }} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} options={{ title: 'Szczegóły podróży' }} />
      <Stack.Screen name="AddTrip" component={AddTripScreen} options={{ title: 'Dodać podróż' }} />
      <Stack.Screen name="FilterTrips" component={FilterTripsScreen} options={{ title: 'Filtr podróży' }} />
    </Stack.Navigator>
  );
}

function TripTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f8f9fa' },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Trips"
        component={TripStack}
        options={{
          title: 'Podróże',
          tabBarIcon: ({ color, size }) => <Ionicons name="airplane" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="TripTabs"
        component={TripTabs}
        options={{
          title: 'Główna',
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'O aplikacji',
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle" size={size} color={color} />,
          // Убрана строка cardStyleInterpolator — она не подходит для Drawer.Screen
        }}
      />
      <Drawer.Screen
        name="Hits"
        component={HitsScreen}
        options={{
          title: 'Rekomendacje',
          drawerIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Dojazd"
        component={DojazdScreen}
        options={{
          title: 'Dojazd',
          drawerIcon: ({ color, size }) => <Ionicons name="car" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Hotels"
        component={HotelsScreen}
        options={{
          title: 'Hotele',
          drawerIcon: ({ color, size }) => <Ionicons name="bed" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
