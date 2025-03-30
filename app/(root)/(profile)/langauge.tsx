import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const languages = [
    { id: 'english', name: 'English', code: 'en' },
    { id: 'spanish', name: 'Spanish', code: 'es' },
    { id: 'french', name: 'French', code: 'fr' },
    { id: 'german', name: 'German', code: 'de' },
    { id: 'chinese', name: 'Chinese', code: 'zh' },
    { id: 'japanese', name: 'Japanese', code: 'ja' },
    { id: 'arabic', name: 'Arabic', code: 'ar' },
    { id: 'hindi', name: 'Hindi', code: 'hi' },
  ];

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.languageItem, selectedLanguage === item.id && styles.selectedLanguageItem]}
      onPress={() => setSelectedLanguage(item.id)}
    >
      <Text style={styles.languageName}>{item.name}</Text>
      {selectedLanguage === item.id && (
        <Ionicons name="checkmark" size={24} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select your preferred language</Text>
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedLanguageItem: {
    backgroundColor: '#F5F5F5',
  },
  languageName: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageScreen;