import { useAuth } from "@/context/AuthContext"; // Import the AuthContext
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native"; // Import necessary components
import { useRouter } from "expo-router"; // Import the router for navigation
import GroupsScreen from "./groups"; // Import your Groups screen component
import ProfileScreen from "./profile"; // Import your Profile screen component

const TabsIndex = () => {
  const { user, initialized } = useAuth(); // Get user and initialized state from context
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Check if user is authenticated
    if (initialized) {
      if (!user) {
        router.replace("/(auth)/login"); // Redirect to login if not authenticated
      }
    }
  }, [user, initialized, router]); // Run effect when user or initialized state changes

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />{" "}
        {/* Show loading indicator */}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Render your tab navigation here */}
      <GroupsScreen /> {/* Render Groups screen */}
      <ProfileScreen /> {/* Render Profile screen */}
    </View>
  );
};
export default TabsIndex;
