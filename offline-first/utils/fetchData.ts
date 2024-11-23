import AsyncStorage from "@react-native-async-storage/async-storage";

export const DATA_API = "https://jsonplaceholder.typicode.com/posts";

export async function fetchAndCacheData(setContent: (data: any[]) => void) {
  try {
    const response = await fetch(DATA_API);
    const data = await response.json();
    await AsyncStorage.setItem("cachedContent", JSON.stringify(data));
    setContent(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
