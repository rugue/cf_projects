import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Chat Groups", // Displayed on the group list screen
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Chat", // Displayed when inside a group chat
        }}
      />
    </Stack>
  );
};

export default StackLayout;
