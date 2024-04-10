import React from 'react'; // Make sure React is imported
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './AppNavigation'; // Import AppNavigation

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
    backgroundColor: '#b59f3b', // Keep your custom background color
    // Remove alignItems and justifyContent to allow navigation to fill the screen
  },
});
