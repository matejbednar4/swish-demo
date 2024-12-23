import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "./tabs/start";
import RegisterAndLogin from "./tabs/registerAndLogin";
import AdditionalRegister from "./tabs/additionalRegister";
import { StyleSheet, View } from "react-native";

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
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              backgroundColor: "transparent",
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0], // Slide-up animation
                  }),
                },
              ],
            },
          }),
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="RegisterAndLogin" component={RegisterAndLogin} />
        <Stack.Screen
          name="AdditionalRegister"
          component={AdditionalRegister}
        />
      </Stack.Navigator>
    </View>
  );
}
