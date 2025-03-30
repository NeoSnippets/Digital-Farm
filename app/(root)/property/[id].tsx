import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { Models } from 'react-native-appwrite';

import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";

import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const windowHeight = Dimensions.get("window").height;
  
  // Fetching property data from Appwrite database
  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  // Handle book now button press
  const handleBookNow = () => {
    setShowAddressModal(true);
  };

  // Handle submit order
  const handleSubmitOrder = () => {
    if (address.trim() === "") {
      Alert.alert("Error", "Please enter your address");
      return;
    }
    
    // Close the address modal
    setShowAddressModal(false);
    
    // Show success toast
    setShowSuccessToast(true);
    
    // Hide success toast after 3 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
    
    // Reset address field
    setAddress("");
  };

  // Checking if the property data exists
  if (!property) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={{ marginBottom: 50 }}
      >
        {/* Image section */}
        <View style={[styles.imageContainer, { height: windowHeight / 2 }]}>
          <Image
            source={{ uri: property?.Images }}
            style={styles.fullSizeImage}
            resizeMode="cover"
          />
          
          <View style={[styles.headerContainer, { top: Platform.OS === "android" ? 70 : 20 }]}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Image source={icons.backArrow} style={styles.backArrow} />
              </TouchableOpacity>

              <View style={styles.headerIcons}>
                <Image
                  source={icons.heart}
                  style={styles.iconSize}
                  tintColor="#191D31"
                />
                <Image source={icons.send} style={styles.iconSize} />
              </View>
            </View>
          </View>
        </View>

        {/* Property details */}
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyName}>{property?.name}</Text>

          <View style={styles.propertyMeta}>
            <View style={styles.propertyType}>
              <Text style={styles.propertyTypeText}>{property?.type}</Text>
            </View>

            <View style={styles.propertyRating}>
              <Image source={icons.star} style={styles.iconSize} />
              <Text style={styles.ratingText}>
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          {/* Property Information */}
          <ScrollView horizontal>
          <View style={styles.propertyInfo}>
            <View style={styles.infoItem}>
              <View style={styles.container}>
                <Image source={icons.bed} style={styles.iconSize} />
              </View>
              <Text style={styles.infoText}>{property?.Fertilizers_Percentages}Fertilizers</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.container}>
                <Image source={icons.bath} style={styles.iconSize} />
              </View>
              <Text style={styles.infoText}>{property?.Pesticides_Insecticides} Pesticides</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.container}>
                <Image source={icons.area} style={styles.iconSize} />
              </View>
              <Text style={styles.infoText}>{property?.area} Are Left</Text>
            </View>
          </View>
          </ScrollView>
          {/* Agent Information */}
          <View style={styles.agentSection}>
            <Text style={styles.agentTitle}>Agent</Text>
            <View style={styles.agentInfo}>
              <View style={styles.agentInfoLeft}>
                <Image
                  source={{ uri: property?.agents.avatar }}
                  style={styles.agentAvatar}
                />
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>{property?.agents.name}</Text>
                  <Text style={styles.agentEmail}>{property?.agents.email}</Text>
                </View>
              </View>

              <View style={styles.agentActions}>
                <Image source={icons.chat} style={styles.iconSize} />
                <Image source={icons.phone} style={styles.iconSize} />
              </View>
            </View>
          </View>

          {/* Overview */}
          <View style={styles.overviewSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>{property?.description}</Text>
          </View>

          {/* Facilities */}
          <View style={styles.facilitiesSection}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            {property?.facilities.length > 0 && (
              <View style={styles.facilitiesList}>
                {property?.facilities.map((item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, index: React.Key | null | undefined) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );
                  return (
                    <View key={index} style={styles.facilityItem}>
                      <View style={styles.facilityIconContainer}>
                        <Image
                          source={facility ? facility.icon : icons.info}
                          style={styles.facilityIcon}
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.facilityText}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {/* Gallery */}
          {property?.galleries.length > 0 && (
            <View style={styles.gallerySection}>
              <Text style={styles.sectionTitle}>Gallery</Text>
              <FlatList
                contentContainerStyle={styles.galleryList}
                data={property?.galleries}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: property?.Images }}
                    style={styles.galleryImage}
                  />
                )}
              />
            </View>
          )}

          {/* Location */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Farm Location</Text>
            <View style={styles.locationInfo}>
              <Image source={icons.location} style={styles.locationIcon} />
              <Text style={styles.locationText}>{property?.address}</Text>
            </View>

            <Image
              source={images.map}
              style={styles.mapImage}
            />
          </View>

          {/* Reviews */}
          {property?.reviews.length > 0 && (
            <View style={styles.reviewsSection}>
              <View style={styles.reviewsHeader}>
                <View style={styles.reviewsLeft}>
                  <Image source={icons.star} style={styles.iconSize} />
                  <Text style={styles.reviewsText}>
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.commentSection}>
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Booking Section */}
      <View style={styles.bookSection}>
        <View style={styles.bookSectionContent}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>${property?.Price}</Text>
          </View>

          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddressModal}
        onRequestClose={() => setShowAddressModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delivery Address</Text>
            
            <TextInput
              style={styles.addressInput}
              placeholder="Enter your delivery address"
              value={address}
              onChangeText={setAddress}
              multiline={true}
              numberOfLines={3}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowAddressModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmitOrder}
              >
                <Text style={styles.submitButtonText}>Submit Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Toast */}
      {showSuccessToast && (
        <View style={styles.toastContainer}>
          <View style={styles.toast}>
            <Text style={styles.toastText}>Successfully ordered book!</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  fullSizeImage: {
    width: "100%",
    height: "100%",
  },
  whiteGradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 40,
  },
  headerContainer: {
    position: "absolute",
    left: 7,
    right: 7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50", // Primary color
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  propertyDetails: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  propertyName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  propertyMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  propertyType: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#E0F2FE", // Primary light background color
    borderRadius: 50,
  },
  propertyTypeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4CAF50", // Primary color
  },
  propertyRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#4B5563", // Text color
    marginTop: 5,
  },
  propertyInfo: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0F2FE", // Light background color
    borderRadius: 50,
    padding: 10,
    gap: 25,
  },
  infoText: {
    fontSize: 14,
    color: "#4B5563", // Text color
    marginLeft: 5,
  },
  agentSection: {
    marginTop: 20,
  },
  agentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5563", // Text color
  },
  agentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  agentInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  agentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  agentDetails: {
    marginLeft: 15,
  },
  agentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B5563", // Text color
  },
  agentEmail: {
    fontSize: 14,
    color: "#6B7280", // Text color
  },
  agentActions: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  overviewSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5563", // Text color
  },
  description: {
    fontSize: 16,
    color: "#6B7280", // Text color
    marginTop: 10,
  },
  facilitiesSection: {
    marginTop: 20,
  },
  facilitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    marginTop: 10,
  },
  facilityItem: {
    width: "25%",
    alignItems: "center",
  },
  facilityIconContainer: {
    backgroundColor: "#E0F2FE", // Light background color
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  facilityIcon: {
    width: 30,
    height: 30,
  },
  facilityText: {
    fontSize: 12,
    color: "#4B5563", // Text color
    marginTop: 10,
    textAlign: "center",
  },
  gallerySection: {
    marginTop: 20,
  },
  galleryList: {
    gap: 10,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  locationSection: {
    marginTop: 20,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  locationIcon: {
    width: 24,
    height: 24,
  },
  locationText: {
    fontSize: 16,
    color: "#4B5563", // Text color
    marginLeft: 10,
  },
  mapImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  reviewsSection: {
    marginTop: 20,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewsText: {
    fontSize: 16,
    color: "#4B5563", // Text color
    marginLeft: 5,
  },
  viewAllText: {
    fontSize: 14,
    color: "#3B82F6", // Primary color
  },
  commentSection: {
    marginTop: 10,
  },
  bookSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
  },
  bookSectionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4B5563", // Text color
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50", // Primary color
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: "#4CAF50", // Primary color
    borderRadius: 50,
    padding: 15,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4B5563',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Toast styles
  toastContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Property;