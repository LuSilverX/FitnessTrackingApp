import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* TouchableOpacity to make them look like buttons */}
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
    elevation: 2, // Android Shadow
    shadowOpacity: 0.6, // adds 
    shadowRadius: 10, // shadow 
    shadowOffset: { width: 0, height: 2 }, 
  },
  image: {
    width: 500, 
    height: 250, 
    resizeMode: 'contain', // maintaing aspect ratio
  },
});

export default HomeScreen;
