import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import Start from "./app/start";
import RegisterAndLogin from "./app/registerAndLogin";
import AdditionalForm from "./app/additionalForm";
import App from "./app/tabs/app";

export type RootStackParamList = {
  Start: undefined;
  RegisterAndLogin: { login?: boolean };
  AdditionalForm: undefined;
  App: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true }}
      >
        {/* <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="RegisterAndLogin" component={RegisterAndLogin} />
        <Stack.Screen name="AdditionalForm" component={AdditionalForm} /> */}
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
    </View>
  );
}
