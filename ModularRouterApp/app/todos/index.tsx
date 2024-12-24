import { useTodos } from "../../context/TodoContext";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Todos() {
  const { todos, deleteTodo } = useTodos();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Todos</Text>
      {todos.map((todo, index) => (
        <View key={index} style={styles.todo}>
          <Text>{todo}</Text>
          <Button title="Delete" onPress={() => deleteTodo(index)} />
        </View>
      ))}
      <Link href="/todos/add" style={styles.link}>
        Add New Todo
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  todo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  link: {
    marginTop: 10,
    fontSize: 18,
    color: "#6200ea",
  },
});
