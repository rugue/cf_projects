import { FIREBASE_AUTH } from "@/config/FirebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Pressable, Text } from "react-native";

export default function AppTabs() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      router.replace("/(auth)/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <Tabs>
      {/* Point to groups/index */}
      <Tabs.Screen
        // name="groups/index"
        name="groups"
        options={{
          headerShown: false, // Remove the header
          // title: "Groups", remove this too
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ marginRight: 10 }}>
              <Text>Logout</Text>
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
