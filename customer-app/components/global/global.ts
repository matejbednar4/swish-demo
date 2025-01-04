import * as secureStore from "expo-secure-store";
import * as sdk from "../../../sdk/src/routes/customer";

const backendUrl = "http://localhost:8080";

const emptyCustomer: sdk.Customer = {
  id: 0,
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  address: "",
  score: 0,
  createdAt: new Date(),
  filled: 0,
};

const storeData = async (key: string, value: string): Promise<void> => {
  try {
    await secureStore.setItemAsync(key, value);
  } catch (err) {
    console.error("Failed to save data securely", err);
  }
};

const getStoredData = async (key: string): Promise<string | undefined> => {
  try {
    const value = await secureStore.getItemAsync(key);
    if (value) return value;
  } catch (err) {
    console.error("Failed to fetch secure data", err);
  }
};

export { backendUrl, storeData, getStoredData, emptyCustomer };
