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
    <SafeAreaView style={{ ...StyleSheet.absoluteFillObject, flex: 1 }}>
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
      >
        {/* Header container */}
        <View style={styles.startHeader}>
          {/* Heading */}
          <Text style={textStyles.startHeading}>Swish</Text>
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
              Log in to an existing account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.startRegisterButton}
            onPress={() => {
              navigation.navigate("RegisterAndLogin", { login: false });
            }}
          >
            <Text style={textStyles.startRegisterText}>
              Create a new account
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
    marginBottom: "8%",
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
    fontFamily: "Inter",
    fontSize: 70,
    color: "white",
  },

  startLoginText: {
    fontSize: 16,
  },

  startRegisterText: {
    fontSize: 16,
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
    borderWidth: 2,
  },
});
