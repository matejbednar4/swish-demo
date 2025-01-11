import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import TopMenu from "@/components/TopMenu";
import Home from "./home";
import Discover from "./discover";
import BottomNavigation from "@/components/BottomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "./account";
import Favorites from "./favorites";
import {
  getStoredData,
  loadCustomer,
  storeData,
} from "@/components/global/global";
import { CustomerProvider, useCustomer } from "@/components/CustomerContext";
import * as customerSdk from "../../../sdk/src/routes/customer";
import { colors } from "@/constants/Colors";
import Settings from "./settings";

const Tab = createBottomTabNavigator();

export default function AppWrapper() {
  return (
    <CustomerProvider>
      <App />
    </CustomerProvider>
  );
}

function App() {
  const { setCustomer } = useCustomer();

  const updateCustomerFromBackend = async () => {
    const storedCustomerString = await getStoredData("customer");
    if (!storedCustomerString || storedCustomerString === "") {
      Alert.alert("Nobody is logged in");
      return;
    }

    const storedCustomer = JSON.parse(storedCustomerString);

    if (storedCustomer.id === 0) {
      Alert.alert("Nobody is logged in");
      return;
    }

    const response = await customerSdk.getCustomerById(storedCustomer.id);

    if ("error" in response) {
      console.error("here:", response.error);
      return;
    }

    const json = response.json;
    storeData("customer", JSON.stringify(json));
    setCustomer(json);
  };

  useEffect(() => {
    updateCustomerFromBackend();
  }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.darkerBackground,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopMenu /> */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: ({ navigation }) => (
              <TopMenu
                title={route.name}
                onBack={navigation.canGoBack() ? navigation.goBack : undefined}
              />
            ),
          })}
          tabBar={({ navigation }) => {
            const route =
              navigation.getState().routes[navigation.getState().index];

            return <BottomNavigation route={route} navigation={navigation} />;
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Discover" component={Discover} />
          <Tab.Screen name="Favorites" component={Favorites} />
          <Tab.Screen name="Account" component={Account} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </SafeAreaView>
    </View>
  );
}
