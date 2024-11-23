import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { fetchAndCacheData } from "../utils/fetchData";
import { loadCachedData } from "../utils/storage";
import ListItem from "../components/ListItem";
import Buttons from "../components/Buttons";

const MainScreen = () => {
  const [content, setContent] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCachedData(setContent);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAndCacheData(setContent);
    setRefreshing(false);
  };

  const handleClear = () => setContent([]);
  const handleReload = () => loadCachedData(setContent);

  return (
    <>
      <FlatList
        data={content}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem title={item.title} body={item.body} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <Buttons onClear={handleClear} onReload={handleReload} />
    </>
  );
};

export default MainScreen;
