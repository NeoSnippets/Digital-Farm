import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const MyArticlesScreen = () => {
  const [articles, setArticles] = useState([
    {
      id: '1',
      title: 'How to Improve Your Productivity',
      date: 'Mar 15, 2025',
      image: 'https://thumbs.dreamstime.com/z/happy-african-farmer-working-countryside-holding-wood-box-fresh-vegetables-215052594.jpg',
      excerpt: 'Learn the best techniques to boost your daily productivity and achieve more in less time.'
    },
    {
      id: '2',
      title: 'Dont kill farmer',
      date: 'Mar 10, 2025',
      image: 'https://th.bing.com/th/id/OIP.5eC-Q9iX-K8jXxejJL9HDwHaEP?rs=1&pid=ImgDetMain',
      excerpt: 'dont kill farmer unhe bhi jine ka hak hai'
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.articleItem}>
      <Image source={{ uri: item.image }} style={styles.articleImage} />
      <View style={styles.articleInfo}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDate}>{item.date}</Text>
        <Text style={styles.articleExcerpt} numberOfLines={2}>{item.excerpt}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="ellipsis-vertical" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No articles yet</Text>
          </View>
        }
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push("../addarticle")}
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
  articleItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  articleImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  articleDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  articleExcerpt: {
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

export default MyArticlesScreen;