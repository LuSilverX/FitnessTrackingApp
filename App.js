import React from 'react'; 
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './AppNavigation'; 

export default function App() {
  return (
    <>
      <View style={styles.container}>
        {/* Render the AppNavigation component */}
        <AppNavigation />
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b59f3b', 
  },
});
