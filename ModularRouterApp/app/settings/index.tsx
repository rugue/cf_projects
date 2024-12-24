// app/settings/index.tsx
import { useTheme } from "../../context/ThemeContext";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, theme === "dark" && styles.dark]}>
      <Text style={[styles.title, theme === "dark" && styles.darkText]}>
        Current Theme: {theme.toUpperCase()}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dark: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  darkText: {
    color: "#fff",
  },
});
