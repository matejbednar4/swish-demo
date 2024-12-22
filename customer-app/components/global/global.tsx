import * as SecureStore from "expo-secure-store";

const backendUrl = "http://localhost:8080";

const saveSecureData = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (err) {
    console.error("Failed to save data securely", err);
  }
};

const getSecureData = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) return value;
  } catch (err) {
    console.error("Failed to fetch secure data", err);
  }
};

export { backendUrl, saveSecureData, getSecureData };
