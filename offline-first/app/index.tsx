// import React, { useState, useEffect } from "react";
// import { FlatList, RefreshControl, StyleSheet } from "react-native";
// import { fetchAndCacheData } from "../utils/fetchData";
// import { loadCachedData } from "../utils/storage";
// import ListItem from "../components/ListItem";
// import Buttons from "../components/Buttons";

// const MainScreen = () => {
//   const [content, setContent] = useState<any[]>([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadCachedData(setContent);
//   }, []);

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchAndCacheData(setContent);
//     setRefreshing(false);
//   };

//   const handleClear = () => setContent([]);
//   const handleReload = () => loadCachedData(setContent);

//   return (
//     <>
//       <FlatList
//         data={content}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <ListItem title={item.title} body={item.body} />
//         )}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//       />
//       <Buttons onClear={handleClear} onReload={handleReload} />
//     </>
//   );
// };

// export default MainScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAndCacheData } from "../utils/fetchData";
import { loadCachedData } from "../utils/storage";
import ListItem from "../components/ListItem";
import Buttons from "../components/Buttons";
import { useNetworkStatus } from "../utils/useNetworkStatus";

const MainScreen = () => {
  const [content, setContent] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const isConnected = useNetworkStatus();

  useEffect(() => {
    // Load cached data when the app starts
    loadCachedData(setContent);
  }, []);

  const handleRefresh = async () => {
    if (!isConnected) {
      Alert.alert(
        "Offline",
        "You are currently offline. Data cannot be refreshed."
      );
      return;
    }
    setRefreshing(true);
    await fetchAndCacheData(setContent);
    setRefreshing(false);
  };

  const handleClear = () => setContent([]);
  const handleReload = () => loadCachedData(setContent);

  return (
    <View style={styles.container}>
      {!isConnected && (
        <Text style={styles.offlineBanner}>
          You are offline. Displaying cached data.
        </Text>
      )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  offlineBanner: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "#ffd700",
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default MainScreen;
