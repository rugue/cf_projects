// app/index.tsx
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ModularRouterApp!</Text>
      <Button title="Go to Profile" onPress={() => null} />
      <Link href="/profile" style={styles.link}>
        Go to Profile Page
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    color: "#6200ea",
    fontSize: 16,
    marginTop: 10,
  },
});
