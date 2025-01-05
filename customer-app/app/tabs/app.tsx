import React from "react";
import { StyleSheet, View } from "react-native";
import TopMenu from "@/components/TopMenu";
import Home from "./home";
import Discover from "./discover";
import BottomNavigation from "@/components/BottomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Account from "./account";
import Favorites from "./favorites";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View
      style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#f8f9fa" }}
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
        </Tab.Navigator>
      </SafeAreaView>
    </View>
  );
}
