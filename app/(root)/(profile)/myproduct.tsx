import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const MyProductsScreen = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Tractor',
      price: '$129.99',
      image: 'https://th.bing.com/th/id/OIP.I94PhXmm1q79TxZZ9FtyCQHaD-?rs=1&pid=ImgDetMain',
      description: 'best tata tractor'
    },
    {
      id: '2',
      name: 'mangos',
      price: '$199.99',
      image: 'https://th.bing.com/th/id/OIP.MuACch_A01Ioj655ITWcewHaEc?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      description: 'fresh mangos'
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="ellipsis-vertical" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products yet</Text>
          </View>
        }
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push("../addproduct")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  productItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default MyProductsScreen;