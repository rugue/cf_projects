import React from "react";
import { View, Button, StyleSheet } from "react-native";

const Buttons = ({
  onClear,
  onReload,
}: {
  onClear: () => void;
  onReload: () => void;
}) => (
  <View style={styles.container}>
    <Button title="Clear" onPress={onClear} />
    <Button title="Reload" onPress={onReload} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
});

export default Buttons;
