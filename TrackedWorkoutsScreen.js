import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from './FirebaseConfig'; // Import your db instance from the firebase config file
import { collection, query, orderBy, getDocs } from 'firebase/firestore'; // Import query and orderBy

const TrackedWorkoutsScreen = () => {
  const [trackedWorkouts, setTrackedWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workoutsCollectionRef = collection(db, 'workouts'); // Reference to your Firestore collection
      const workoutsQuery = query(workoutsCollectionRef, orderBy('timestamp', 'desc')); // Query that orders the workouts by the 'createdAt' field, newest first
      try {
        const querySnapshot = await getDocs(workoutsQuery);
        const workouts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            workoutType: data.workoutType,
            miles: data.miles,
            duration: data.duration, // Keep the nested structure of duration
          };
        });
        setTrackedWorkouts(workouts);
      } catch (error) {
        console.error("Error fetching workouts: ", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracked Workouts</Text>
      <FlatList
        data={trackedWorkouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutContainer}>
            <Text style={styles.workoutText}>{`Exercise: ${item.workoutType}, Miles: ${item.miles}, Duration: ${item.duration.hours}h ${item.duration.minutes}m`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  workoutContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  workoutText: {
    fontSize: 18,
  },
  // Add more styles as needed
});

export default TrackedWorkoutsScreen;
