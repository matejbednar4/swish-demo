import { colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={styles.main}>
      <Text>Log Out</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    backgroundColor: colors.background,
  },
});
