// RecommendationsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { getLatestRunningActivity } from './someHelperFunctions'; // You need to implement this
import { getRecommendationsFromShopify } from './someHelperFunctions'; // You need to implement this

const RecommendationsScreen = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Get the latest running activity from the database
        const activity = await getLatestRunningActivity();

        // Get the recommendations from Shopify
        const recommendations = await getRecommendationsFromShopify(activity);
        
        // Set the recommendations to state
        setRecommendedProducts(recommendations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
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
  },
  product: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontWeight: 'bold',
  },
  // Add more styles as needed
});

export default RecommendationsScreen;
