import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadCachedData(setContent: (data: any[]) => void) {
  try {
    const cachedData = await AsyncStorage.getItem("cachedContent");
    if (cachedData) {
      setContent(JSON.parse(cachedData));
    }
  } catch (error) {
    console.error("Error loading cached data:", error);
  }
}

export async function clearCachedContent() {
  await AsyncStorage.removeItem("cachedContent");
}
