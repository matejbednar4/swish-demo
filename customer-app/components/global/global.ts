import { NavigationProp, NavigationState } from "@react-navigation/native";
import * as secureStore from "expo-secure-store";
import * as customerSdk from "../../../sdk/src/routes/customer";
import { useCustomer } from "../CustomerContext";

// -----------------------------------
// this has to do with storing and getting data from expo-secure-store
export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    await secureStore.setItemAsync(key, value);
  } catch (err) {
    console.error("Failed to save data securely", err);
  }
};

export const getStoredData = async (
  key: string
): Promise<string | undefined> => {
  try {
    const value = await secureStore.getItemAsync(key);
    if (value) return value;
  } catch (err) {
    console.error("Failed to fetch secure data", err);
  }
};
// -----------------------------------

// -----------------------------------
// This has to do with getting the current route for bottom and top menu
export interface currentRoute {
  home: boolean;
  discover: boolean;
  favorites: boolean;
  account: boolean;
  settings: boolean;
}

export const emptyRoute: currentRoute = {
  home: false,
  discover: false,
  favorites: false,
  account: false,
  settings: false,
};

export const getCurrentRoute = (route: any): currentRoute => {
  let currentRoute: currentRoute = { ...emptyRoute };

  switch (route.name) {
    case "Home":
      currentRoute = { ...emptyRoute };
      currentRoute.home = true;
      return currentRoute;
    case "Discover":
      currentRoute = { ...emptyRoute };
      currentRoute.discover = true;
      return currentRoute;
    case "Favorites":
      currentRoute = { ...emptyRoute };
      currentRoute.favorites = true;
      return currentRoute;
    case "Account":
      currentRoute = { ...emptyRoute };
      currentRoute.account = true;
      return currentRoute;
    case "Settings":
      currentRoute = { ...emptyRoute };
      currentRoute.settings = true;
      return currentRoute;
    default:
      currentRoute = { ...emptyRoute };
      return emptyRoute;
  }
};
// -----------------------------------

export const loadCustomer = async (): Promise<customerSdk.Customer> => {
  const response = await getStoredData("customer");
  if (response && response !== "") {
    return JSON.parse(response);
  }

  return customerSdk.emptyCustomer;
};

export const updateCustomerFromBackend = async () => {
  const id = (await loadCustomer()).id;
  const response = await customerSdk.getCustomerById(id);

  if ("error" in response) {
    console.error("here:", response.error);
    return;
  }

  const json = response.json;
  await storeData("customer", JSON.stringify(json));
  return json;
};
