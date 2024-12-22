import React from "react";
import { Redirect } from "expo-router";
import { useFonts } from "expo-font";

const start = "/tabs/start";
const home = "/tabs/home";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });

  return <Redirect href={start}></Redirect>;
}
