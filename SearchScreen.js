import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    const graphqlQuery = `
      {
        products(first: 5, query: "title:*${query}*") {
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
      }
    `;

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://quickstart-ca6ada74.myshopify.com/api/2021-10/graphql.json', // Replace with your Shopify store's GraphQL endpoint
        headers: {
          'X-Shopify-Storefront-Access-Token': '0ca170b2f491752d4fe31757e2d0fea5', // Replace with your Storefront access token
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ query: graphqlQuery }),
      });

      setProducts(response.data.data.products.edges.map(edge => edge.node));
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
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
            <Text>{`${item.priceRange.minVariantPrice.amount} ${item.priceRange.minVariantPrice.currencyCode}`}</Text>
            {/* You can add more details you need here */}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  productItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default SearchScreen;
