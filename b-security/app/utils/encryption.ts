import * as Crypto from "expo-crypto";
import { ENCRYPTION_KEY } from "@env";
import { encode as btoa, decode as atob } from "base-64";

export class Encryption {
  // Use a constant key if env var is not available (for development only)
  private static readonly DEV_KEY =
    "development_key_do_not_use_in_production_32";
  private static readonly KEY = ENCRYPTION_KEY || this.DEV_KEY;

  private static arrayBufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  private static base64Encode(str: string): string {
    return btoa(encodeURIComponent(str));
  }

  private static base64Decode(str: string): string {
    return decodeURIComponent(atob(str));
  }

  static async encrypt(text: string): Promise<string> {
    try {
      if (!text) throw new Error("No text provided for encryption");

      // Create a unique salt for each encryption
      const salt = await Crypto.getRandomBytesAsync(16);
      const saltHex = this.arrayBufferToHex(salt);

      // Create a unique key for this encryption using the salt
      const uniqueKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${this.KEY}:${saltHex}`
      );

      // Encrypt the text using the unique key
      const textToEncrypt = this.base64Encode(text);
      const encryptedData = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${textToEncrypt}:${uniqueKey}`
      );

      // Combine salt and encrypted data
      return `${saltHex}:${textToEncrypt}:${encryptedData}`;
    } catch (error) {
      console.error("Encryption error:", error);
      throw new Error("Failed to encrypt data");
    }
  }

  static async decrypt(encryptedData: string): Promise<string> {
    try {
      if (!encryptedData) throw new Error("No data provided for decryption");

      // Split the components
      const [saltHex, textToDecrypt, verificationHash] =
        encryptedData.split(":");

      // Recreate the unique key using the stored salt
      const uniqueKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${this.KEY}:${saltHex}`
      );

      // Verify the data hasn't been tampered with
      const expectedHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${textToDecrypt}:${uniqueKey}`
      );

      if (expectedHash !== verificationHash) {
        throw new Error("Data integrity check failed");
      }

      // Decode the base64 text
      return this.base64Decode(textToDecrypt);
    } catch (error) {
      console.error("Decryption error:", error);
      throw new Error("Failed to decrypt data");
    }
  }
}
