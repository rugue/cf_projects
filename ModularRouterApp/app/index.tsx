import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Advanced Modular App</Text>
      <Link href="/profile" style={styles.link}>
        Go to Profile
      </Link>
      <Link href="/settings" style={styles.link}>
        Go to Settings
      </Link>
      <Link href="/todos" style={styles.link}>
        Manage Todos
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: "#6200ea",
    marginVertical: 10,
  },
});
