import React, { useEffect, useState } from "react";
import { FlatList, Text, View, RefreshControl, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchData } from "../utils/storage"; // Keep the data-fetching logic in a separate utility file.

const DATA_API = "https://jsonplaceholder.typicode.com/posts";

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load cached data from AsyncStorage
  const loadCachedData = async () => {
    const cachedData = await AsyncStorage.getItem("cachedData");
    if (cachedData) {
      setData(JSON.parse(cachedData));
    }
  };

  // Refresh data (fetch from API and cache it)
  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      const newData = await fetchData(DATA_API); // Fetch data using a utility function
      setData(newData);
      await AsyncStorage.setItem("cachedData", JSON.stringify(newData)); // Cache new data
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Clear the screen but retain cached data
  const clearData = () => {
    setData([]);
  };

  useEffect(() => {
    loadCachedData(); // Load cached data on mount
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ marginBottom: 8, fontSize: 18, fontWeight: "bold" }}>
        Offline-First Notes
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            {item.title}
          </Text>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
      <View style={{ marginTop: 16 }}>
        <Button title="Clear Screen" onPress={clearData} />
      </View>
    </View>
  );
};

export default Index;
