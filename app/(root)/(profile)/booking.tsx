import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MyBookingScreen = () => {
  const bookings = [
    { id: '1', service: 'Consultation', date: 'Mar 25, 2025', time: '10:00 AM', status: 'Confirmed' },
    { id: '2', service: 'Follow-up', date: 'Apr 05, 2025', time: '2:30 PM', status: 'Pending' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.serviceName}>{item.service}</Text>
      <Text style={styles.bookingDate}>{item.date} at {item.time}</Text>
      <View style={[
        styles.statusBadge, 
        item.status === 'Confirmed' ? styles.confirmedStatus : styles.pendingStatus
      ]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings} // Pass the bookings array
        renderItem={renderItem} // Pass renderItem function
        keyExtractor={(item) => item.id} 
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookingItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  confirmedStatus: {
    backgroundColor: '#E8F5E9',
  },
  pendingStatus: {
    backgroundColor: '#FFF8E1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
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

export default MyBookingScreen;