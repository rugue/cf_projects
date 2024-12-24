// components/Button.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Button;
