import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {ImageBackground,Text,TextInput,Button,StyleSheet,TouchableOpacity,} from 'react-native';
import { auth } from './FirebaseConfig';  
import { useNavigation } from '@react-navigation/native'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Redirect the user to another screen or update the state
        console.log('User logged in: ', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Error handling
        console.error('Error signing in: ', errorCode, errorMessage);
        // Depending on errorCode, show the user the appropriate message
      });
  };

  return (
    <ImageBackground 
      source={require('./assets/UIB1.png')} 
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
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#33E9FF',
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
    color: '#fff', 
    textDecorationLine: 'underline', 
  },
 
});

export default LoginScreen;
