import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = () => {
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    const query = `
      {
        products(first: 5, query: "title:*running shirts*") {
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
            }
          }
        }
      }
    `;

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://quickstart-ca6ada74.myshopify.com/api/2021-10/graphql.json', // Replace with your Shopify store URL
        headers: {
          'X-Shopify-Storefront-Access-Token': '0ca170b2f491752d4fe31757e2d0fea5', // Replace with your Storefront access token
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ query }),
      });

      setProducts(response.data.data.products.edges.map(edge => edge.node));
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error);
    }
  };

  // Call the search function on component mount (for demo purposes)
  useState(() => {
    handleSearch();
  }, []);

  return (
    <View style={styles.container}>
      {/* Search UI can be implemented here if needed */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.title}</Text>
            <Image
              style={styles.image}
              source={{ uri: item.images.edges[0]?.node.src }}
            />
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
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SearchScreen;
