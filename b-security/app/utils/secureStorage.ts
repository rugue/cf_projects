import * as SecureStore from "expo-secure-store";
import { Encryption } from "./encryption";

export class SecureStorage {
  static async saveSecureItem(key: string, value: string): Promise<void> {
    try {
      if (!key || !value) {
        throw new Error("Key and value are required");
      }
      const encryptedValue = await Encryption.encrypt(value);
      await SecureStore.setItemAsync(key, encryptedValue);
    } catch (error) {
      console.error("Save secure item error:", error);
      throw new Error("Failed to save secure item");
    }
  }

  static async getSecureItem(key: string): Promise<string | null> {
    try {
      const encryptedValue = await SecureStore.getItemAsync(key);
      if (!encryptedValue) return null;
      return await Encryption.decrypt(encryptedValue);
    } catch (error) {
      console.error("Get secure item error:", error);
      throw new Error("Failed to get secure item");
    }
  }
}
