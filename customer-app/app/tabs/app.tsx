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
import { CustomerProvider, useCustomer } from "@/components/CustomerContext";
import * as customerSdk from "../../../shared/sdk/src/routes/customer";
import { colors } from "@/constants/Colors";
import Settings from "./settings";
import { getStoredData } from "@/components/global/global";
import { useRouter } from "expo-router";

const Tab = createBottomTabNavigator();

export default function AppWrapper() {
  return (
    <CustomerProvider>
      <App />
    </CustomerProvider>
  );
}

function App() {
  const router = useRouter();
  const { setCustomer } = useCustomer();

  const setCustomerProvider = async () => {
    const jwt = await getStoredData("jwt");

    if (!jwt || jwt === "") {
      router.push("..");
      return;
    }

    const response = await customerSdk.getLoggedInCustomer(jwt);
    const json = response.json;

    if ("error" in json) {
      Alert.alert("failed to load logged in user");
      router.push("..");
      return;
    }

    setCustomer(json.customer);
  };

  useEffect(() => {
    setCustomerProvider();
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
