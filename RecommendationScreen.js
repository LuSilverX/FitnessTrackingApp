import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { db } from './FirebaseConfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import axios from 'axios';

const RecommendationScreen = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // Fetch the last workout
      const workoutsQuery = query(collection(db, 'workouts'), orderBy('timestamp', 'desc'), limit(1));
      const workoutSnapshot = await getDocs(workoutsQuery);
      const lastWorkout = workoutSnapshot.docs[0]?.data();
      
      // Determine the keyword for recommendations
      const keyword = lastWorkout && lastWorkout.miles > 6 ? 'long' : 'sprint';

      // Fetch products based on the last workout
      const graphqlQuery = {
        query: `{
          products(first: 5, query: "title:*${keyword}*") {
            edges {
              node {
                id
                title
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }`
      };

      try {
        const response = await axios.post(
          'https://quickstart-ca6ada74.myshopify.com/api/2021-10/graphql.json',
          JSON.stringify(graphqlQuery),
          {
            headers: {
              'X-Shopify-Storefront-Access-Token': '0ca170b2f491752d4fe31757e2d0fea5',
              'Content-Type': 'application/json',
            }
          }
        );
        setRecommendations(response.data.data.products.edges.map(edge => edge.node));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.title}</Text>
            <Image style={styles.image} source={{ uri: item.images.edges[0]?.node.src }} />
            <Text>{`${item.priceRange.minVariantPrice.amount} ${item.priceRange.minVariantPrice.currencyCode}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default RecommendationScreen;