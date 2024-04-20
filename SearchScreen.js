import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [lastCursor, setLastCursor] = useState(null); // Cursor for pagination
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (direction = 'next') => {
    setError('');
    setLoading(true);
    if (!query.trim()) {
      setError('Please enter a search term.');
      setLoading(false);
      return;
    }

    let paginationQuery = '';
    if (direction === 'next' && lastCursor) {
      paginationQuery = `, after: "${lastCursor}"`;
    }

    const graphqlQuery = {
      query: `{
        products(first: 5, query: "title:*${query}*"${paginationQuery}) {
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
      const response = await axios({
        method: 'POST',
        url: 'https://quickstart-ca6ada74.myshopify.com/api/2021-10/graphql.json',
        headers: {
          'X-Shopify-Storefront-Access-Token': '0ca170b2f491752d4fe31757e2d0fea5',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(graphqlQuery),
      });

      const { edges, pageInfo } = response.data.data.products;
      if (edges.length === 0) {
        setError('No products found. Try a different search term.');
      } else {
        setProducts(edges.map(edge => edge.node));
        setLastCursor(edges[edges.length - 1].cursor);
      }
      setLoading(false);
      return pageInfo.hasNextPage;
    } catch (error) {
      setError('Error fetching products. Please try again.');
      setLoading(false);
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
    }
  };

  const handleSearch = () => {
    setLastCursor(null); // Reset pagination
    fetchProducts();
  };

  const handleNextPage = () => {
    fetchProducts('next');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} disabled={loading} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image
              style={styles.image}
              source={{ uri: item.images.edges[0]?.node.src }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text>{`${item.priceRange.minVariantPrice.amount} ${item.priceRange.minVariantPrice.currencyCode}`}</Text>
            </View>
          </View>
        )}
      />
      <Button title="Next Page" onPress={handleNextPage} disabled={!lastCursor || loading} />
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
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SearchScreen;
