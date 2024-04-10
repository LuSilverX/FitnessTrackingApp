// LoginScreen.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  ImageBackground,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { auth } from './FirebaseConfig'; // Note that case-sensitivity matters in file paths
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Hook to get the navigation object

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // You can now redirect the user to another screen or update the state
        console.log('User logged in: ', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here, such as displaying a notification to the user
        console.error('Error signing in: ', errorCode, errorMessage);
        // Depending on errorCode, show the user the appropriate message
      });
  };

  return (
    <ImageBackground 
      source={require('./assets/UIB.png')} // Make sure the path to your image is correct
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>My Fitness Tracker</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {/* TouchableOpacity for navigation to a Register screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Not registered? Click here to sign up.</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centered in the middle of the screen
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  registerText: {
    marginTop: 20,
    color: '#0000ff', // Make text blue
    textDecorationLine: 'underline', // Underline the text
  },
  // Add additional styles as needed
});

export default LoginScreen;
