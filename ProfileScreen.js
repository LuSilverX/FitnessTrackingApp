import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require('./assets/Profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>Luis Silva</Text>
        <Text style={styles.emailText}>lsilva56@toromail.csudh.edu</Text>
        <Text style={styles.universityText}>CSUDH</Text>
      </View>
      
      <View style={styles.buttonSection}>
        <Button title="Account Settings" color="#000" onPress={() => {}} />
        <Button title="Privacy & Security" color="#000" onPress={() => {}}  />
        <Button title="Notifications" color="#000" onPress={() => {}}  />
        <Button title="Contact Us" color="#000" onPress={() => {}} />
        <Button title="More" color="#000" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20
  },
  profileImage: {
    width: 200,
    height: 300,
    borderRadius: 50
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 8
  },
  emailText: {
    fontSize: 20,
    color: '#666'
  },
  universityText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20
  },
  buttonSection: {
    width: '80%'
  }
});

export default ProfileScreen;
