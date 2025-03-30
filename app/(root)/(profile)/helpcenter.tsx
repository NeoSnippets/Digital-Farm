import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpCenterScreen = () => {
  const faqs = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login screen and tap on "Forgot Password". Follow the instructions sent to your email to create a new password.'
    },
    {
      id: '2',
      question: 'How can I cancel my booking?',
      answer: 'You can cancel your booking by going to My Bookings, selecting the booking you want to cancel, and tapping on the Cancel button. Please note our cancellation policy.'
    },
    {
      id: '3',
      question: 'How do I add a new payment method?',
      answer: 'To add a new payment method, go to the Payment section in your profile, tap on "Add New", and follow the instructions to add your card or other payment details.'
    },
    {
      id: '4',
      question: 'Can I edit my published article?',
      answer: 'Yes, you can edit your published article by going to My Articles, selecting the article you want to edit, and tapping on the edit button. Your changes will be reviewed before being published.'
    },
  ];

  const [expandedFaq, setExpandedFaq] = React.useState(null);

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for help"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <TouchableOpacity style={styles.contactOption}>
          <View style={styles.contactIconContainer}>
            <Ionicons name="mail-outline" size={24} color="#4CAF50" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Email Support</Text>
            <Text style={styles.contactDescription}>Get help via email. We typically respond within 24 hours.</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactOption}>
          <View style={styles.contactIconContainer}>
            <Ionicons name="chatbubble-outline" size={24} color="#4CAF50" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactDescription}>Chat with our support team in real-time.</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactOption}>
          <View style={styles.contactIconContainer}>
            <Ionicons name="call-outline" size={24} color="#4CAF50" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Phone Support</Text>
            <Text style={styles.contactDescription}>Call us directly for immediate assistance.</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq) => (
          <TouchableOpacity 
            key={faq.id} 
            style={styles.faqItem}
            onPress={() => toggleFaq(faq.id)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Ionicons 
                name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666" 
              />
            </View>
            {expandedFaq === faq.id && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    margin: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
  },
  faqItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
});

export default HelpCenterScreen;