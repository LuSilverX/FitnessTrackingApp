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
    marginBottom: 20, // space between the buttons
    elevation: 2, // adds a shadow (Android)
    shadowOpacity: 0.6, // adds shadow (IOS)
    shadowRadius: 10, // adds shadow (IOS)
    shadowOffset: { width: 0, height: 2 }, // adds shadow on (IOS)
  },
  image: {
    width: 500, 
    height: 250, 
    resizeMode: 'contain', // ensuring the image fits within the dimensions and maintains aspect ratio
  },
});

export default HomeScreen;
