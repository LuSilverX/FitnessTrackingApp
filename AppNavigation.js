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
import RecommendationsScreen from './RecommendationScreen';
import SearchScreen from './SearchScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from './ProfileScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tracker stack 
function TrackerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tracker" component={TrackerScreen} />
      <Stack.Screen name="TrackedWorkouts" component={TrackedWorkoutsScreen} />
    </Stack.Navigator>
  );
}

const MainAppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home'; // name of the icon from MaterialIcons
        } else if (route.name === 'Tracker') {
          iconName = 'fitness-center'; // example icon name
        } else if (route.name === 'Recommendations') {
          iconName = 'thumbs-up-down'; // example icon name
        } else if (route.name === 'Search') {
          iconName = 'search'; // name of the icon from MaterialIcons
        } else if (route.name === 'Profile') {
          iconName = 'person'; // name of the icon from MaterialIcons
        }

        // You can return any component that you like here!
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
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

    return unsubscribe; // Cleaning up the subscription on unmount
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainAppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
