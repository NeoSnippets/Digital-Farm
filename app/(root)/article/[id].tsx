import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StyleSheet,
  Modal,
  Share,
  FlatList,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import { technologies } from "@/constants/data";
import Markdown from "react-native-markdown-display";

import { useAppwrite } from "@/lib/useAppwrite";
import { getArticleById } from "@/lib/appwrite";
  
const FarmingArticle = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get("window").height;
  const [markdownData, setMarkdownData] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  
  // Sample comments data
  const [comments, setComments] = useState([
    {
      id: '1',
      user: {
        name: 'John Smith',
        avatar: 'https://via.placeholder.com/100',
      },
      text: 'This article is very informative! I learned a lot about sustainable farming techniques.',
      date: '2 days ago',
      likes: 12,
      isLiked: false,
    },
    {
      id: '2',
      user: {
        name: 'Maria Garcia',
        avatar: 'https://via.placeholder.com/100',
      },
      text: 'I\'ve been using these techniques on my farm and have seen great results. The crop yield has increased by 30% this season!',
      date: '3 days ago',
      likes: 8,
      isLiked: true,
    },
    {
      id: '3',
      user: {
        name: 'Robert Chen',
        avatar: 'https://via.placeholder.com/100',
      },
      text: 'Could you provide more information about the irrigation system you mentioned? I\'m interested in implementing it on my farm.',
      date: '5 days ago',
      likes: 5,
      isLiked: false,
    },
    {
      id: '4',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/100',
      },
      text: 'Great article! I\'ve been looking for ways to improve soil health on my farm.',
      date: '1 week ago',
      likes: 15,
      isLiked: false,
    },
    {
      id: '5',
      user: {
        name: 'David Williams',
        avatar: 'https://via.placeholder.com/100',
      },
      text: 'Thanks for sharing your experience. The photos of your farm are beautiful!',
      date: '1 week ago',
      likes: 7,
      isLiked: false,
    },
  ]);

  // Fetching article data from Appwrite database
  const { data: article, loading, error } = useAppwrite({
    fn: getArticleById,
    params: {
      id: id!,
    },
  });

  // Update markdown content when article data is available
  useEffect(() => {
    if (article?.pitch) {
      setMarkdownData(article.pitch);
    }
  }, [article]); // Runs only when `article` changes

  // Handle share functionality
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this farming article: ${article?.name}\n\n${article?.description}\n\nRead more on our app!`,
        title: article?.name,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Toggle share modal
  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  // Toggle comments modal
  const toggleCommentsModal = () => {
    setShowCommentsModal(!showCommentsModal);
  };

  // Share via specific platform
  const shareVia = (platform) => {
    // In a real app, you would implement platform-specific sharing
    console.log(`Sharing via ${platform}`);
    handleShare();
    setShowShareModal(false);
  };

  // Handle like comment
  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const isLiked = !comment.isLiked;
        return {
          ...comment,
          isLiked,
          likes: isLiked ? comment.likes + 1 : comment.likes - 1
        };
      }
      return comment;
    }));
  };

  // Render comment item
  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.user.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUserName}>{item.user.name}</Text>
          <Text style={styles.commentDate}>{item.date}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity 
            style={styles.likeButton} 
            onPress={() => handleLikeComment(item.id)}
          >
            <Image 
              source={icons.heart} 
              style={[
                styles.likeIcon, 
                item.isLiked && { tintColor: '#4CAF50' }
              ]} 
            />
            <Text style={[
              styles.likeCount, 
              item.isLiked && { color: '#4CAF50' }
            ]}>
              {item.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.replyButton}>
            <Text style={styles.replyButtonText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Loading state
  if (loading || !article) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading article: {error.message}</Text>
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
        {/* Cover Image section */}
        <View style={[styles.imageContainer, { height: windowHeight / 2 }]}>
          <Image source={{ uri: article.image }} style={styles.fullSizeImage} resizeMode="cover" />
          <View style={[styles.headerContainer, { top: Platform.OS === "android" ? 70 : 20 }]}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Image source={icons.backArrow} style={styles.backArrow} />
              </TouchableOpacity>
              <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.shareButton} onPress={toggleShareModal}>
                  <Image source={icons.send} style={styles.iconSize} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookmarkButton}>
                  <Image source={icons.heart} style={styles.iconSize} tintColor="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Article details */}
        <View style={styles.articleDetails}>
          {/* Tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
            {article.type && article.type.map((tag, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Title and meta */}
          <Text style={styles.articleTitle}>{article.name}</Text>
          <View style={styles.articleMeta}>
            <Text style={styles.dateText}>
              {article.date || "No date provided"}
            </Text>
          </View>

          {/* Author Information */}
          {article.agents && (
            <View style={styles.authorSection}>
              <View style={styles.authorInfo}>
                <View style={styles.authorInfoLeft}>
                  <Image 
                    source={{ uri: article.agents.avatar }} 
                    style={styles.authorAvatar} 
                    defaultSource={require("@/assets/placeholder.png")} // Make sure you have a placeholder image
                  />
                  <View style={styles.authorDetails}>
                    <Text style={styles.authorName}>{article.agents.name}</Text>
                    <Text style={styles.authorEmail}>{article.agents.email}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Introduction */}
          <View style={styles.contentSection}>
            <Text style={styles.description}>{article.description}</Text>
          </View>

          {/* Farm Stats */}
          <ScrollView horizontal>
            <View style={styles.farmStats}>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Image source={icons.area} style={styles.iconSize} />
                </View>
                <Text style={styles.statText}>{article.Farm_size || "N/A"}</Text>
                <Text style={styles.statLabel}>Farm Size</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Image source={icons.bed} style={styles.iconSize} />
                </View>
                <Text style={styles.statText}>{article.crop_yield || "N/A"}</Text>
                <Text style={styles.statLabel}>Crop Yield</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Image source={icons.bath} style={styles.iconSize} />
                </View>
                <Text style={styles.statText}>{article.organic || "N/A"}</Text>
                <Text style={styles.statLabel}>Organic</Text>
              </View>
            </View>
          </ScrollView>

          {/* Content Sections */}
          
          {/* Render Markdown Content */}
          <Markdown style={styles.markdown}>{markdownData}</Markdown>

          {/* Farming Technologies */}
          <View style={styles.technologiesSection}>
            <Text style={styles.sectionTitle}>Technology in Farming</Text>
            <View style={styles.technologiesList}>
              {article.technologies && article.technologies.length > 0 && 
                article.technologies.map((item, index) => {
                  const technology = technologies.find(
                    (tech) => tech.title === item
                  );
                  return (
                    <View key={index} style={styles.technologyItem}>
                      <View style={styles.technologyIconContainer}>
                        <Image
                          source={technology ? technology.icon : icons.info}
                          style={styles.technologyIcon}
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.technologyText}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })
              }
            </View>
          </View>

          {/* Gallery */}
          <View style={styles.gallerySection}>
            <Text style={styles.sectionTitle}>Farm Gallery</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {article.gallery && article.gallery.map((imageUrl, index) => (
                <Image 
                  key={index} 
                  source={{ uri: imageUrl }} 
                  style={styles.galleryImage} 
                  defaultSource={require("@/assets/placeholder.png")} // Make sure you have a placeholder image
                />
              ))}
            </ScrollView>
          </View>

          {/* Location */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Farm Location</Text>
            <View style={styles.locationInfo}>
              <Image source={icons.location} style={styles.locationIcon} />
              <Text style={styles.locationText}>{article.location || "Location not specified"}</Text>
            </View>
            <Image source={images.map} style={styles.mapImage} />
          </View>

          {/* Conclusion */}
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Conclusion</Text>
            <Text style={styles.sectionText}>
              {article.conclusion || 
                "Farming is a rewarding journey that requires persistence and smart decision-making. By sharing my experience, I hope to inspire others to embrace agriculture with confidence and innovation. Happy farming!"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Share Section */}
      <View style={styles.shareSection}>
        <View style={styles.shareSectionContent}>
          <TouchableOpacity style={styles.commentButton} onPress={toggleCommentsModal}>
            <Image source={icons.chat} style={styles.iconSize} />
            <Text style={styles.commentButtonText}>Comments ({comments.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareArticleButton} onPress={toggleShareModal}>
            <Text style={styles.shareButtonText}>Share Article</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Share Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showShareModal}
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Share Article</Text>
            
            <View style={styles.shareOptions}>
              <TouchableOpacity 
                style={styles.shareOption} 
                onPress={() => shareVia('whatsapp')}
              >
                <View style={[styles.shareIconContainer, { backgroundColor: '#25D366' }]}>
                  <Image source={icons.chat} style={styles.shareIcon} />
                </View>
                <Text style={styles.shareOptionText}>WhatsApp</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareOption}
                onPress={() => shareVia('facebook')}
              >
                <View style={[styles.shareIconContainer, { backgroundColor: '#3b5998' }]}>
                  <Image source={icons.chat} style={styles.shareIcon} />
                </View>
                <Text style={styles.shareOptionText}>Facebook</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareOption}
                onPress={() => shareVia('twitter')}
              >
                <View style={[styles.shareIconContainer, { backgroundColor: '#1DA1F2' }]}>
                  <Image source={icons.chat} style={styles.shareIcon} />
                </View>
                <Text style={styles.shareOptionText}>Twitter</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareOption}
                onPress={() => shareVia('email')}
              >
                <View style={[styles.shareIconContainer, { backgroundColor: '#DB4437' }]}>
                  <Image source={icons.chat} style={styles.shareIcon} />
                </View>
                <Text style={styles.shareOptionText}>Email</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.copyLinkButton}
              onPress={() => {
                // In a real app, you would implement copy to clipboard functionality
                console.log('Copy link');
                setShowShareModal(false);
              }}
            >
              <Image source={icons.chat} style={[styles.iconSize, { marginRight: 8 }]} />
              <Text style={styles.copyLinkText}>Copy Link</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowShareModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Comments Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCommentsModal}
        onRequestClose={() => setShowCommentsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.commentsModalContent}>
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>
              <TouchableOpacity onPress={toggleCommentsModal}>
                <Image source={icons.backArrow} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={comments}
              renderItem={renderCommentItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.commentsList}
            />
            
            <View style={styles.addCommentContainer}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/100' }} 
                style={styles.userAvatar} 
              />
              <View style={styles.commentInputContainer}>
                <Text style={styles.commentPlaceholder}>Add a comment...</Text>
              </View>
              <TouchableOpacity style={styles.sendButton}>
                <Image source={icons.send} style={styles.sendIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "white",
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
    backgroundColor: "#4CAF50",
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
  shareButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bookmarkButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  articleDetails: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  markdown: { 
    fontSize: 16,
    color: "#333", 
    paddingHorizontal: 20,
    marginTop: 20 
  },
  tagItem: {
    backgroundColor: "#E8F5E9",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  tagText: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "bold",
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
  },
  articleMeta: {
    marginTop: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#757575",
  },
  authorSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 20,
  },
  authorInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorDetails: {
    marginLeft: 15,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },
  authorEmail: {
    fontSize: 14,
    color: "#757575",
  },
  followButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  contentSection: {
    marginTop: 25,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#424242",
  },
  farmStats: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 120,
  },
  statIconContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    marginBottom: 8,
  },
  statText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#757575",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#424242",
  },
  technologiesSection: {
    marginTop: 25,
  },
  technologiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  technologyItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  technologyIconContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 50,
    padding: 12,
    marginBottom: 8,
  },
  technologyIcon: {
    width: 24,
    height: 24,
    tintColor: "#4CAF50",
  },
  technologyText: {
    fontSize: 12,
    color: "#424242",
    textAlign: "center",
  },
  gallerySection: {
    marginTop: 25,
  },
  galleryList: {
    gap: 10,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  locationSection: {
    marginTop: 25,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  locationIcon: {
    width: 24,
    height: 24,
    tintColor: "#4CAF50",
  },
  locationText: {
    fontSize: 16,
    color: "#424242",
    marginLeft: 10,
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  shareSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  shareSectionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  commentButtonText: {
    marginLeft: 8,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  shareArticleButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
    textAlign: 'center',
  },
  shareOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  shareOption: {
    alignItems: 'center',
  },
  shareIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  shareOptionText: {
    fontSize: 14,
    color: '#424242',
  },
  copyLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 15,
  },
  copyLinkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#757575',
    fontWeight: 'bold',
  },
  // Comments modal styles
  commentsModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  closeIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: '90deg' }],
  },
  commentsList: {
    padding: 20,
    paddingBottom: 100,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
  },
  commentDate: {
    fontSize: 12,
    color: '#757575',
  },
  commentText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  likeIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  likeCount: {
    fontSize: 12,
    color: '#757575',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyButtonText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: 'bold',
  },
  addCommentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentInputContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  commentPlaceholder: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default FarmingArticle;