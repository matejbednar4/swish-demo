import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Start({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#70e000", "#9ef01a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Visible content on the scroll screen */}
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        {/* Header container */}
        <View style={styles.startHeader}>
          {/* Heading */}
          <Text style={textStyles.startHeading}>Swish</Text>
          <Text style={textStyles.motto}>For Businesses</Text>
        </View>
        {/* Login and Register buttons container */}
        <View style={styles.startButtons}>
          {/* Login and Register buttons */}
          <TouchableOpacity
            style={buttonStyles.startLoginButton}
            onPress={() => {
              navigation.navigate("RegisterAndLogin", { login: true });
            }}
          >
            <Text style={textStyles.startLoginText}>
              Log in to a business account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.startRegisterButton}
            onPress={() => {
              navigation.navigate("RegisterAndLogin", { login: false });
            }}
          >
            <Text style={textStyles.startRegisterText}>
              Create a new business account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  startHeader: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "10%",
    alignItems: "center",
  },

  startButtons: {
    width: "66%",
    flex: 1.3,
    justifyContent: "flex-start",
    gap: "10",
  },
});

const textStyles = StyleSheet.create({
  startHeading: {
    position: "absolute",
    fontWeight: "700",
    fontSize: 70,
    color: "white",
    paddingBottom: "1.5%",
  },

  motto: {
    color: "white",
    fontWeight: "400",
  },

  startLoginText: {
    fontSize: 14,
    fontWeight: "600",
  },

  startRegisterText: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
  },
});

const buttonStyles = StyleSheet.create({
  startLoginButton: {
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "white",
  },

  startRegisterButton: {
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
  },
});
