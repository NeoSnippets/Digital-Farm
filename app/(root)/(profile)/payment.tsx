import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentScreen = () => {
  const paymentMethods = [
    { id: '1', type: 'Credit Card', last4: '4242', expiry: '05/26', isDefault: true },
    { id: '2', type: 'PayPal', email: 'user@example.com', isDefault: false },
  ];

  const transactions = [
    { id: '1', description: 'Product Purchase', amount: '-$49.99', date: 'Mar 15, 2025' },
    { id: '2', description: 'Subscription Renewal', amount: '-$9.99', date: 'Mar 10, 2025' },
    { id: '3', description: 'Refund', amount: '+$15.00', date: 'Mar 05, 2025' },
    { id: '3', description: 'Tomatos', amount: '+$222.00', date: 'Mar 05, 2025' },

  ];

  const renderPaymentMethod = ({ item }) => (
    <View style={styles.paymentMethodItem}>
      <View style={styles.paymentMethodIcon}>
        {item.type === 'Credit Card' ? (
          <Ionicons name="card-outline" size={24} color="#333" />
        ) : (
          <Ionicons name="logo-paypal" size={24} color="#333" />
        )}
      </View>
      <View style={styles.paymentMethodInfo}>
        <Text style={styles.paymentMethodType}>{item.type}</Text>
        {item.last4 && <Text style={styles.paymentMethodDetail}>**** **** **** {item.last4}</Text>}
        {item.email && <Text style={styles.paymentMethodDetail}>{item.email}</Text>}
        {item.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="ellipsis-vertical" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        item.amount.startsWith('+') ? styles.positiveAmount : styles.negativeAmount
      ]}>
        {item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethod}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    </View>
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
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentMethodIcon: {
    marginRight: 16,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodType: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  paymentMethodDetail: {
    fontSize: 14,
    color: '#666',
  },
  defaultBadge: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  positiveAmount: {
    color: '#4CAF50',
  },
  negativeAmount: {
    color: '#F44336',
  },
});

export default PaymentScreen;