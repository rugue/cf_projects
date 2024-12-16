import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
        <Stack.Screen name="(auth)/register" options={{ title: "Register" }} />
      </Stack>
    </AuthProvider>
  );
}
