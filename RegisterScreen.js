import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth } from './FirebaseConfig'; 

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registered successfully
        const user = userCredential.user;
        console.log('User registered: ', user);
        // Redirect the user or update state as needed
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Error handling
        console.error('Error registering: ', errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
 
});

export default RegisterScreen;
