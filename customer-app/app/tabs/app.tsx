import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import TopMenu from "@/components/TopMenu";
import Home from "./home";
import Discover from "./discover";
import BottomNavigation from "@/components/BottomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";

export type AppStackParamList = {
  Home: undefined;
  Discover: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export default function App() {
  return (
    <View
      style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#f8f9fa" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TopMenu navigation={Stack} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        <BottomNavigation />
      </SafeAreaView>
    </View>
  );
}
