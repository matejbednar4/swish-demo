import React from "react";
import { StyleSheet, View } from "react-native";
import TopMenu from "@/components/TopMenu";
import Home from "./home";
import Discover from "./discover";
import BottomNavigation from "@/components/BottomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View
      style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#f8f9fa" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TopMenu />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TopMenu" component={TopMenu} />
        </Stack.Navigator>
        <BottomNavigation />
      </SafeAreaView>
    </View>
  );
}
