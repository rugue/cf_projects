// app/todos/add.tsx
import { useState } from "react";
import { useTodos } from "../../context/TodoContext";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function AddTodo() {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new todo"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Todo" onPress={() => addTodo(text)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
});
