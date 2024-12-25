import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "./tabs/start";
import RegisterAndLogin from "./tabs/registerAndLogin";
import { StyleSheet, View } from "react-native";
import Home from "./tabs/home";
import AdditionalForm from "./tabs/additionalForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent",
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="RegisterAndLogin" component={RegisterAndLogin} />
        <Stack.Screen name="AdditionalForm" component={AdditionalForm} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </View>
  );
}
