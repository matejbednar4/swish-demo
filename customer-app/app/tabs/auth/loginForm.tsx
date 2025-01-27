import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "@/constants/styles/loginForm";
import { colors } from "@/constants/Colors";
import { useState } from "react";
import * as authSDK from "../../../../shared/sdk/src/routes/auth";
import { storeData } from "@/components/global/global";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const customer = { email, password };
    const response = await authSDK.loginCustomer(customer);

    if (response.status === 404) {
      Alert.alert("Email is not registered");
      return;
    }

    if (response.status === 401) {
      Alert.alert("Wrong pasword");
      return;
    }

    if ("token" in response.json && response.status === 200) {
      storeData("jwt", response.json.token);
      router.push("/tabs/app");
      return;
    }
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      {/* Visible content on the scroll screen */}
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <View style={styles.header}>
          {/* Heading */}
          <Text style={styles.heading}>Swish</Text>
        </View>
        {/* Login and Register buttons container */}
        <View style={styles.buttons}>
          {/* Login and Register buttons */}
          <TouchableOpacity style={styles.selectedButton}>
            <Text style={styles.selectedText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unselectedButton}
            onPress={() => router.push("/tabs/auth/registerForm")}
          >
            <Text style={styles.unselectedText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            {/* Login form header */}
            <View style={styles.formHeader}>
              <Text style={styles.formHeading}>Log in to your account</Text>
            </View>
            {/* Login form fields */}
            <View style={styles.formFields}>
              {/* Each login form field */}
              <View style={styles.formField}>
                <Text style={{ color: colors.black }}>Enter your email</Text>
                <TextInput
                  placeholder="john@swish.com"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.fieldInput}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.formField}>
                <Text style={{ color: colors.black }}>Enter your password</Text>
                <TextInput
                  placeholder="password"
                  placeholderTextColor={colors.placeholder}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.fieldInput}
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.formButton} onPress={handleLogin}>
            <Text style={{ color: colors.background, fontWeight: "600" }}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
