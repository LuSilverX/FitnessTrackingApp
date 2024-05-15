import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Button } from 'react-native';
import { db } from './FirebaseConfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import axios from 'axios';

const RecommendationScreen = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [cursorStack, setCursorStack] = useState([]); // Stack to manage navigation history
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async (direction = 'next') => {
    setLoading(true);
    setError('');

    // Fetching the last workout to determine the keyword
    const workoutsQuery = query(collection(db, 'workouts'), orderBy('timestamp', 'desc'), limit(1));
    const workoutSnapshot = await getDocs(workoutsQuery);
    const lastWorkout = workoutSnapshot.docs[workoutSnapshot.docs.length - 1]?.data();
    const keyword = lastWorkout && lastWorkout.miles > 6 ? 'long' : 'sprint';

    let paginationQuery = '';
    if (direction === 'next' && cursorStack.length > 0) {
      paginationQuery = `, after: "${cursorStack[cursorStack.length - 1]}"`;
    } else if (direction === 'previous' && cursorStack.length > 1) {
      // Remove the current cursor as we are moving back
      cursorStack.pop();
      paginationQuery = cursorStack.length > 1 ? `, after: "${cursorStack[cursorStack.length - 2]}"` : '';
    }

    const graphqlQuery = {
      query: `{
        products(first: 5, query: "title:*${keyword}*"${paginationQuery}) {
          edges {
            cursor
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
          pageInfo {
            hasNextPage
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
      const { edges, pageInfo } = response.data.data.products;
      setRecommendations(edges.map(edge => edge.node));
      if (direction === 'next' && edges.length > 0) {
        // Push the new cursor when moving forward
        setCursorStack([...cursorStack, edges[edges.length - 1].cursor]);
      }
      setLoading(false);
    } catch (error) {
      setError('Error fetching recommendations. Please try again.');
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    fetchRecommendations('next');
  };

  const handlePreviousPage = () => {
    if (cursorStack.length > 1) {
      fetchRecommendations('previous');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Recommendations</Text>
      <FlatList
        data={recommendations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image style={styles.image} source={{ uri: item.images.edges[0]?.node.src }} />
            <Text>{item.title}</Text>
            <Text>{`${item.priceRange.minVariantPrice.amount} ${item.priceRange.minVariantPrice.currencyCode}`}</Text>
          </View>
        )}
      />
      <Button title="Next Page" onPress={handleNextPage} disabled={loading || !cursorStack.length} />
      <Button title="Previous Page" onPress={handlePreviousPage} disabled={loading || cursorStack.length <= 1} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default RecommendationScreen;