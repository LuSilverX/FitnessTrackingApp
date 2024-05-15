import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { View, TextInput, Button, StyleSheet, ImageBackground, Alert, Text } from 'react-native';
import { auth } from './FirebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registered successfully
        const user = userCredential.user;
        console.log('User registered: ', user);
        // Optionally redirect the user or update state as needed
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Error handling
        console.error('Error registering: ', errorCode, errorMessage);
        Alert.alert("Registration Error", errorMessage);
      });
  };

  return (
    <ImageBackground source={require('./assets/UIB1.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
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
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
        <Button title="Back to Login" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default RegisterScreen;
