// src/screens/NotesScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

const STORAGE_KEY = "user_notes";

const NotesScreen = () => {
  const [note, setNote] = useState<string>("");
  const [savedNote, setSavedNote] = useState<string | null>(null);

  const saveNote = async () => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEY, note);
      alert("Note saved securely!");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const loadNote = async () => {
    try {
      const retrievedNote = await SecureStore.getItemAsync(STORAGE_KEY);
      setSavedNote(retrievedNote);
    } catch (error) {
      console.error("Error loading note:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Note:</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Type something..."
      />
      <Button title="Save Note" onPress={saveNote} />
      <Button title="Load Note" onPress={loadNote} />
      {savedNote && (
        <Text style={styles.savedNote}>Saved Note: {savedNote}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
  savedNote: { marginTop: 16, fontSize: 16, fontStyle: "italic" },
});

export default NotesScreen;
