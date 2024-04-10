import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import TrackerScreen from './TrackerScreen';
import TrackedWorkoutsScreen from './TrackedWorkoutsScreen'; 
import SearchScreen from './SearchScreen'

// Placeholder components for demonstration
// Make sure you replace these with your actual screens

const RecommendationsScreen = () => <View><Text>Recommendations</Text></View>;
const ProfileScreen = () => <View><Text>Settings</Text></View>;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tracker stack inside the tab
function TrackerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tracker" component={TrackerScreen} />
      <Stack.Screen name="TrackedWorkouts" component={TrackedWorkoutsScreen} />
    </Stack.Navigator>
  );
}

// Main app tabs
const MainAppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Tracker" component={TrackerStack} />
    <Tab.Screen name="Recommendations" component={RecommendationsScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Authentication stack
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const AppNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe; // Clean up the subscription on unmount
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainAppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
