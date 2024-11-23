// src/_layout.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import NotesScreen from "./screens/NotesScreen";

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Secure Notes App</Text>
      <NotesScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});

export default Main;
