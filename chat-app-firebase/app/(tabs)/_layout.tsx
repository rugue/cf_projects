import { Tabs } from "expo-router";

export default function AppTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="groups" options={{ title: "Groups" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
