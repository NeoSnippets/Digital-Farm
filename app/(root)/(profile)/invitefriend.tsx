import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Share,
  FlatList,
  Dimensions,
  ImageBackground,
  Animated
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const { width } = Dimensions.get('window');

const InviteFriendsScreen = ({ navigation }) => {
  const [referralCode, setReferralCode] = useState('FARM2025');
  const [email, setEmail] = useState('');
  const [animation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  
  const contacts = [
    { id: '1', name: 'John Smith', avatar: 'https://via.placeholder.com/100', invited: false },
    { id: '2', name: 'Maria Garcia', avatar: 'https://via.placeholder.com/100', invited: true },
    { id: '3', name: 'Robert Chen', avatar: 'https://via.placeholder.com/100', invited: false },
    { id: '4', name: 'Sarah Johnson', avatar: 'https://via.placeholder.com/100', invited: false },
    { id: '5', name: 'David Williams', avatar: 'https://via.placeholder.com/100', invited: true },
  ];

  const benefits = [
    { 
      id: '1', 
      title: 'Get ₹100 for each friend', 
      description: 'Earn rewards when your friends make their first purchase', 
      icon: 'gift',
      image: 'https://via.placeholder.com/100'
    },
    { 
      id: '2', 
      title: 'Friend gets ₹200 off', 
      description: 'Your friend gets a discount on their first order', 
      icon: 'tag',
      image: 'https://via.placeholder.com/100'
    },
    { 
      id: '3', 
      title: 'Support local farmers', 
      description: 'Help local farmers connect with more customers', 
      icon: 'seedling',
      image: 'https://via.placeholder.com/100'
    },
  ];

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    alert('Referral code copied to clipboard!');
  };

  const shareReferralCode = async () => {
    try {
      await Share.share({
        message: `Join me on FarmMarket! Use my referral code ${referralCode} to get ₹200 off your first purchase. Download the app now: https://farmmarket.app/download`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const inviteByEmail = () => {
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    // In a real app, you would send an invitation email here
    alert(`Invitation sent to ${email}`);
    setEmail('');
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Image source={{ uri: item.avatar }} style={styles.contactAvatar} />
      <Text style={styles.contactName}>{item.name}</Text>
      <TouchableOpacity 
        style={[
          styles.inviteButton, 
          item.invited && styles.invitedButton
        ]}
      >
        <Text style={[
          styles.inviteButtonText,
          item.invited && styles.invitedButtonText
        ]}>
          {item.invited ? 'Invited' : 'Invite'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBenefitItem = ({ item }) => (
    <View style={styles.benefitCard}>
      <ImageBackground 
        source={{ uri: item.image }} 
        style={styles.benefitBackground}
        imageStyle={{ borderRadius: 12, opacity: 0.2 }}
      >
        <View style={styles.benefitContent}>
          <View style={styles.benefitIconContainer}>
            <FontAwesome5 name={item.icon} size={24} color="#4CAF50" />
          </View>
          <Text style={styles.benefitTitle}>{item.title}</Text>
          <Text style={styles.benefitDescription}>{item.description}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Banner */}
      <ImageBackground 
        source={{ uri: 'https://img.freepik.com/premium-photo/concept-smart-agriculture-modern-farming-generative-ai_431161-7839.jpg' }} 
        style={styles.banner}
      >
        <View style={styles.bannerOverlay}>
          <Animated.View style={{ opacity, transform: [{ translateY }] }}>
            <Text style={styles.bannerTitle}>Grow Together</Text>
            <Text style={styles.bannerSubtitle}>Invite friends to join our farming community</Text>
          </Animated.View>
        </View>
      </ImageBackground>

      {/* Benefits Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="leaf" size={18} color="#4CAF50" style={{ marginRight: 8 }} />
          Benefits of Sharing
        </Text>
        <FlatList
          data={benefits}
          renderItem={renderBenefitItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.benefitsContainer}
        />
      </View>

      {/* Referral Code Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="ticket-alt" size={18} color="#4CAF50" style={{ marginRight: 8 }} />
          Your Referral Code
        </Text>
        <View style={styles.referralCodeWrapper}>
          <ImageBackground 
            source={{ uri: 'https://via.placeholder.com/400x200' }} 
            style={styles.referralBackground}
            imageStyle={{ borderRadius: 12, opacity: 0.15 }}
          >
            <View style={styles.referralCodeContainer}>
              <Text style={styles.referralCode}>{referralCode}</Text>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={copyToClipboard}
              >
                <Ionicons name="copy-outline" size={20} color="#fff" />
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={shareReferralCode}
        >
          <Ionicons name="share-social-outline" size={20} color="#fff" />
          <Text style={styles.shareButtonText}>Share Your Code</Text>
        </TouchableOpacity>
      </View>

      {/* Invite Methods Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="share-alt" size={18} color="#4CAF50" style={{ marginRight: 8 }} />
          Invite Via
        </Text>
        <View style={styles.inviteMethodsContainer}>
          <TouchableOpacity style={styles.inviteMethodButton}>
            <View style={[styles.inviteMethodIcon, { backgroundColor: '#25D366' }]}>
              <FontAwesome5 name="whatsapp" size={24} color="#fff" />
            </View>
            <Text style={styles.inviteMethodText}>WhatsApp</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.inviteMethodButton}>
            <View style={[styles.inviteMethodIcon, { backgroundColor: '#3b5998' }]}>
              <FontAwesome5 name="facebook" size={24} color="#fff" />
            </View>
            <Text style={styles.inviteMethodText}>Facebook</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.inviteMethodButton}>
            <View style={[styles.inviteMethodIcon, { backgroundColor: '#1DA1F2' }]}>
              <FontAwesome5 name="twitter" size={24} color="#fff" />
            </View>
            <Text style={styles.inviteMethodText}>Twitter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.inviteMethodButton}>
            <View style={[styles.inviteMethodIcon, { backgroundColor: '#DB4437' }]}>
              <MaterialCommunityIcons name="gmail" size={24} color="#fff" />
            </View>
            <Text style={styles.inviteMethodText}>Gmail</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Email Invite Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="mail-outline" size={18} color="#4CAF50" style={{ marginRight: 8 }} />
          Invite by Email
        </Text>
        <View style={styles.emailContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter friend's email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={inviteByEmail}
          >
            <Text style={styles.emailButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contacts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="people-outline" size={18} color="#4CAF50" style={{ marginRight: 8 }} />
          Invite Contacts
        </Text>
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* Invite All Button */}
      <TouchableOpacity style={styles.inviteAllButton}>
        <Text style={styles.inviteAllButtonText}>Invite All Contacts</Text>
      </TouchableOpacity>

      {/* Farmer Community Image */}
      <ImageBackground 
        source={{ uri: 'https://img.freepik.com/premium-photo/concept-growing-crops-using-ai-farming-system-uses-artificial-intelligence-optimize-work_1006821-4087.jpg?w=2000' }} 
        style={styles.communityImageContainer}
      >
        <View style={styles.communityOverlay}>
          <Text style={styles.communityText}>
            Join the growing community of farmers and customers
          </Text>
          <Text style={styles.communitySubtext}>
            Together we can build a sustainable future
          </Text>
        </View>
      </ImageBackground>

      {/* Rewards Tracker */}
      <View style={styles.rewardsSection}>
        <Text style={styles.rewardsTitle}>Your Invitation Rewards</Text>
        <View style={styles.rewardsTracker}>
          <View style={styles.rewardsProgress}>
            <View style={[styles.progressBar, { width: '40%' }]} />
          </View>
          <View style={styles.rewardsStats}>
            <View style={styles.rewardsStat}>
              <Text style={styles.rewardsStatNumber}>2</Text>
              <Text style={styles.rewardsStatLabel}>Friends Joined</Text>
            </View>
            <View style={styles.rewardsStat}>
              <Text style={styles.rewardsStatNumber}>₹200</Text>
              <Text style={styles.rewardsStatLabel}>Earned</Text>
            </View>
            <View style={styles.rewardsStat}>
              <Text style={styles.rewardsStatNumber}>5</Text>
              <Text style={styles.rewardsStatLabel}>Pending</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    height: 200,
    marginBottom: 20,
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitsContainer: {
    paddingRight: 16,
  },
  benefitCard: {
    width: width * 0.7,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  benefitBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  
  benefitContent: {
    padding: 16,
  },
  benefitIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  referralCodeWrapper: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  referralBackground: {
    padding: 16,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  referralCode: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 4,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#388E3C',
    paddingVertical: 14,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  inviteMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  inviteMethodButton: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 16,
  },
  inviteMethodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  inviteMethodText: {
    fontSize: 12,
    color: '#333',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 12,
    backgroundColor: '#F9FFF6',
  },
  emailButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contactName: {
    flex: 1,
    fontSize: 16,
  },
  inviteButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  invitedButton: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  invitedButtonText: {
    color: '#4CAF50',
  },
  inviteAllButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  inviteAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  communityImageContainer: {
    height: 150,
    marginBottom: 30,
  },
  communityOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  communityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  communitySubtext: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  rewardsSection: {
    padding: 16,
    marginBottom: 30,
    backgroundColor: '#F9FFF6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E8F5E9',
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  rewardsTracker: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  rewardsProgress: {
    height: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  rewardsStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardsStat: {
    alignItems: 'center',
  },
  rewardsStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  rewardsStatLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default InviteFriendsScreen;