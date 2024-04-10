// HomeScreen.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Wrap each image with TouchableOpacity to make them look like buttons */}
      <TouchableOpacity style={styles.button}>
        <Image source={require('./assets/WorkoutGuides.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image source={require('./assets/Trending.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image source={require('./assets/Supplements.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 20, // Add some space between the buttons
    elevation: 2, // Optional: this adds a shadow on Android
    shadowOpacity: 0.6, // Optional: this adds shadow on iOS
    shadowRadius: 10, // Optional: this adds shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: this adds shadow on iOS
  },
  image: {
    width: 500, // Set the width as per your requirement
    height: 250, // Set the height as per your requirement
    resizeMode: 'contain', // This will ensure the image fits within the dimensions and maintains aspect ratio
  },
});

export default HomeScreen;
