import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    await AsyncStorage.setItem("cachedData", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
