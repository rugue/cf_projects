import { SecureStorage } from "@/app/utils/secureStorage";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

export const SecureNote: React.FC = () => {
  const [note, setNote] = useState("");

  const saveNote = async () => {
    try {
      await SecureStorage.saveSecureItem("secure_note", note);
      Alert.alert("Success", "Note saved securely!");
      setNote("");
    } catch (error) {
      Alert.alert("Error", "Failed to save note");
    }
  };

  const loadNote = async () => {
    try {
      const savedNote = await SecureStorage.getSecureItem("secure_note");
      if (savedNote) {
        setNote(savedNote);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load note");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        value={note}
        onChangeText={setNote}
        placeholder="Enter your secure note"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Save Note" onPress={saveNote} />
        <Button title="Load Note" onPress={loadNote} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
