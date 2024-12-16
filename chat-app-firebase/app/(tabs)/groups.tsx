import { View, Text, StyleSheet } from "react-native";

const GroupsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      {/* Your group-related content goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default GroupsScreen;
