import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  DocumentData,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../config/FirebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "expo-router";

// Define the Group interface
interface Group {
  id: string;
  name: string;
  description: string;
}

const TabsIndex = () => {
  const { user, initialized } = useAuth(); // Get user and initialized state from context
  const [groups, setGroups] = useState<Group[]>([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Check if user is authenticated
    if (initialized) {
      if (!user) {
        router.replace("/(auth)/login"); // Redirect to login if not authenticated
      }
    }
  }, [user, initialized, router]); // Run effect when user or initialized state changes

  // Initialize the groups collection and fetch data from Firebase
  useEffect(() => {
    const ref = collection(FIREBASE_DB, "groups");

    const unsubscribe = onSnapshot(ref, (snapshot: DocumentData) => {
      const groupsData = snapshot.docs.map((doc: DocumentData) => ({
        id: doc.id,
        ...doc.data(),
      })) as Group[]; // Explicitly cast to Group[]
      setGroups(groupsData);
    });

    return unsubscribe;
  }, []);

  // Function to start a new group
  const startGroup = async () => {
    try {
      if (user) {
        await addDoc(collection(FIREBASE_DB, "groups"), {
          name: `Group #${Math.floor(Math.random() * 1000)}`,
          description: "This is a chat group",
          creator: user.uid,
        });
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.log("Error creating group:", error);
    }
  };

  // Show loading indicator if not initialized
  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />{" "}
        {/* Show loading indicator */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {groups.map((group) => (
          <Link key={group.id} href={`/groups/${group.id}`} asChild>
            <TouchableOpacity style={styles.groupCard}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text>{group.description}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>

      <Pressable style={styles.fab} onPress={startGroup}>
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  groupCard: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  groupName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TabsIndex;
