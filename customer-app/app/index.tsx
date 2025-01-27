import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { getStoredData } from "@/components/global/global";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as authSDK from "../../shared/sdk/src/routes/auth";
import { styles } from "@/constants/styles/index";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkIfSignedIn = async () => {
      const response = await getStoredData("jwt");

      // If there is no customer stored locally
      if (response && response !== "") {
        const sdkRespose = await authSDK.validateCustomerJWT(response);

        if (sdkRespose.status === 200) {
          router.push("/tabs/app");
        }
      }
    };

    checkIfSignedIn();
  }, []);

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <LinearGradient
        colors={["#70e000", "#9ef01a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        {/* Header container */}
        <View style={styles.header}>
          {/* Heading */}
          <Text style={styles.heading}>Swish</Text>
          <Text style={styles.motto}>Experience And Inspire</Text>
        </View>
        {/* Login and Register buttons container */}
        <View style={styles.buttons}>
          {/* Login and Register buttons */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/tabs/auth/loginForm")}
          >
            <Text style={styles.loginText}>Log in to an existing account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push("/tabs/auth/registerForm")}
          >
            <Text style={styles.registerText}>Create a new account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
