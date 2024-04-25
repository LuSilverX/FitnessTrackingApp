import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from './FirebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const TrackerScreen = () => {
  const navigation = useNavigation();
  const [selectedWorkout, setSelectedWorkout] = useState();
  const [miles, setMiles] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleLogWorkout = async () => {
    try {
      const docRef = await addDoc(collection(db, "workouts"), {
        workoutType: selectedWorkout,
        miles: miles,
        duration: { hours: hours, minutes: minutes },
        timestamp: new Date() 
      });
      console.log(`Workout logged with ID: ${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  const navigateToTrackedWorkouts = () => {
    navigation.navigate('TrackedWorkouts'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>

      <Picker
        selectedValue={selectedWorkout}
        onValueChange={(itemValue, itemIndex) => setSelectedWorkout(itemValue)}
        style={styles.picker}>
        <Picker.Item label="-- select --" value="" />
        <Picker.Item label="Running" value="running" />
        <Picker.Item label="Swimming" value="swimming" />
        <Picker.Item label="Cycling" value="cycling" />
        <Picker.Item label="Yoga" value="yoga" />
        <Picker.Item label="Hiking" value="hiking" />
        <Picker.Item label="Dancing" value="dancing" />
        <Picker.Item label="Strength Training" value="strength" />
        <Picker.Item label="Pilates" value="pilates" />
        <Picker.Item label="CrossFit" value="crossfit" />
        {/* More workout options */}
      </Picker>

      {selectedWorkout === 'running' && (
        <>
          <TextInput 
            style={styles.input} 
            value={miles}
            onChangeText={setMiles}
            placeholder="Enter miles"
            keyboardType="numeric"
          />
          <TextInput 
            style={styles.input} 
            value={hours}
            onChangeText={setHours}
            placeholder="Enter hours"
            keyboardType="numeric"
          />
          <TextInput 
            style={styles.input} 
            value={minutes}
            onChangeText={setMinutes}
            placeholder="Enter minutes"
            keyboardType="numeric"
          />
          <Button title="Log Workout" onPress={handleLogWorkout} />
          <Button title="Tracked Workouts" onPress={navigateToTrackedWorkouts} style={styles.button} 
      />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default TrackerScreen;
