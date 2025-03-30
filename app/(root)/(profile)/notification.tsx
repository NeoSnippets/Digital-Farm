import React from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationsScreen = () => {
  const [notificationSettings, setNotificationSettings] = React.useState({
    pushNotifications: true,
    emailNotifications: false,
    bookingReminders: true,
    promotionalOffers: false,
  });

  const toggleSwitch = (key) => {
    setNotificationSettings(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const notifications = [
    { 
      id: '1', 
      title: 'New Product Available', 
      message: 'Check out our latest product in the store!', 
      time: '2h ago',
      read: false
    },
    { 
      id: '2', 
      title: 'Your booking is confirmed', 
      message: 'Your appointment has been confirmed for March 25, 2025 at 10:00 AM.', 
      time: '1d ago',
      read: true
    },
    { 
      id: '3', 
      title: 'Payment Successful', 
      message: 'Your payment of $49.99 has been processed successfully.', 
      time: '3d ago',
      read: true
    },
  ];

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadNotification]}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
        <ScrollView>
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Push Notifications</Text>
          <Switch
            value={notificationSettings.pushNotifications}
            onValueChange={() => toggleSwitch('pushNotifications')}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={'#fff'}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email Notifications</Text>
          <Switch
            value={notificationSettings.emailNotifications}
            onValueChange={() => toggleSwitch('emailNotifications')}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={'#fff'}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Booking Reminders</Text>
          <Switch
            value={notificationSettings.bookingReminders}
            onValueChange={() => toggleSwitch('bookingReminders')}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={'#fff'}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Promotional Offers</Text>
          <Switch
            value={notificationSettings.promotionalOffers}
            onValueChange={() => toggleSwitch('promotionalOffers')}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={'#fff'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  clearAllText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
  },
  notificationItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: '#EBF5FF',
  },
  notificationContent: {
    paddingRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
});

export default NotificationsScreen;