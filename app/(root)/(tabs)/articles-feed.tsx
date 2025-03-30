import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Search from "@/components/Search";
import FilterArticle from "@/components/Filter";
import NoResults from "@/components/NoResult";
import { useGlobalContext } from "@/lib/global-provider";
import { getLatestArticle, getArticle } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import ArticleCard from "@/components/Article-card";

const ArticlesFeed = () => {
  const router = useRouter();
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // Fetching articles
  const { data: latestArticles, loading: latestArticlesLoading } = useAppwrite({
    fn: getLatestArticle,
  });

  const { data: articles = [], refetch, loading } = useAppwrite({
    fn: getArticle,
    params: {
      filter: params.filter || "",
      query: params.query || "",
      limit: 25,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter || "",
      query: params.query || "",
      limit: 25,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/article/${id}`);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ArticleCard item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={1} // 👈 Switched to ONE COLUMN
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 20 }} />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.headerTitle}>Farming Articles</Text>
              <TouchableOpacity style={styles.profileButton}>
                <Image
                  source={{ uri: "/placeholder.svg?height=100&width=100" }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>

            {/* Search & Filters */}
            <Search />
            <FilterArticle />
            <Text style={styles.resultsText}>
              Found {articles?.length} Properties
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginBottom:50
  },
  header: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  resultsText: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    color: "#4b5563", // Color for text-black-300
    marginTop: 20,
  },
});

export default ArticlesFeed;
