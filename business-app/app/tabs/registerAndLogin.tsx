import { backendUrl, saveSecureData } from "@/components/global/global";
import { useState } from "react";
import * as sdk from "../../../sdk/src/routes/business";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterAndLogin({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { login } = route.params || {};
  const [loginForm, setLoginForm] = useState(login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  const handleRegister = async () => {
    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) === false) {
      Alert.alert("Wrong email format.");
      setEmail("");
      return;
    }

    // check if password length is over 8
    if (password.length < 8) {
      Alert.alert("Password needs to be at least 8 characters long.");
      setPassword("");
      setPasswordConfirmation("");
      return;
    }

    // check if password and passwordConfirmation match
    if (password !== passwordConfirmation) {
      Alert.alert("Passwords do not match.");
      setPasswordConfirmation("");
      return;
    }

    const lowercaseEmail = email.toLowerCase();
    const response = await sdk.registerBusiness(lowercaseEmail, password);

    if (response.status === 409) {
      Alert.alert("This email is already registered");
      resetFields();
      return;
    }

    if ("error" in response) {
      console.error(response.error);
      return;
    }

    if (response.status === 201) {
      saveSecureData("business_id", response.json.id.toString());
      navigation.navigate("AdditionalForm");
    }
  };

  const handleLogin = async () => {
    // create a user object and pass it to backend
    const lowercaseEmail = email.toLowerCase();

    const response = await sdk.businessLogin(lowercaseEmail, password);
    if ("error" in response) {
      console.error(response.error);
      resetFields();
      return;
    }

    if (response.status === 401) {
      Alert.alert("Wrong password.");
      setPassword("");
      return;
    }

    if (response.status === 404) {
      Alert.alert("Email not registered.");
      resetFields();
      return;
    }

    if (response.status === 200) {
      loginUser(response.json.id);
    }
  };

  const loginUser = async (uid: any) => {
    saveSecureData("business_id", uid.toString());

    const response = await sdk.getBusinessById(uid);

    if ("error" in response) {
      console.error(response.error);
      return;
    }

    if (response.json.filled === 0) {
      // if the customer has not yet filled the additional form
      navigation.navigate("AdditionalForm");
      return;
    }

    if (response.status === 200) {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Visible content on the scroll screen */}
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <View style={styles.header}>
          {/* Heading */}
          <Text style={textStyles.heading}>Swish</Text>
          <Text style={textStyles.motto}>For Businesses</Text>
        </View>
        {/* Login and Register buttons container */}
        <View style={styles.buttons}>
          {/* Login and Register buttons */}
          <TouchableOpacity
            style={
              loginForm
                ? buttonStyles.selectedButton
                : buttonStyles.unselectedButton
            }
            onPress={() => {
              setLoginForm(true);
            }}
          >
            <Text
              style={
                loginForm ? textStyles.selectedText : textStyles.unselectedText
              }
            >
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              loginForm
                ? buttonStyles.unselectedButton
                : buttonStyles.selectedButton
            }
            onPress={() => {
              setLoginForm(false);
            }}
          >
            <Text
              style={
                loginForm ? textStyles.unselectedText : textStyles.selectedText
              }
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          {loginForm ? (
            // Login form itself
            <View style={styles.form}>
              {/* Login form header */}
              <View style={styles.formHeader}>
                <Text style={textStyles.formHeading}>
                  Log in to your business account
                </Text>
              </View>
              {/* Login form fields */}
              <View style={styles.formFields}>
                {/* Each login form field */}
                <View style={styles.formField}>
                  <Text>Enter your email</Text>
                  <TextInput
                    placeholder="management@business.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.fieldInput}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.formField}>
                  <Text>Enter your password</Text>
                  <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.fieldInput}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          ) : (
            // Register form itself
            <View style={styles.form}>
              {/* Register form header */}
              <View style={styles.formHeader}>
                <Text style={textStyles.formHeading}>
                  Create a new business account
                </Text>
              </View>
              {/* Register form fields */}
              <View style={styles.formFields}>
                {/* Each register form field */}
                <View style={styles.formField}>
                  <Text>Enter your email</Text>
                  <TextInput
                    placeholder="management@business.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.fieldInput}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.formField}>
                  <Text>Enter your password</Text>
                  <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.fieldInput}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.formField}>
                  <Text>Confirm your password</Text>
                  <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    style={styles.fieldInput}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          )}
          {loginForm ? (
            <TouchableOpacity style={styles.formButton} onPress={handleLogin}>
              <Text style={{ color: "white", fontWeight: "600" }}>Log in</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleRegister}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Register
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  buttons: {
    marginTop: "10%",
    marginBottom: "5%",
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "5%",
  },

  formContainer: {
    width: "80%",
    height: "100%",
  },

  form: {
    position: "fixed",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: "5%",
    borderColor: "#ced4da",
    borderWidth: 1,
  },

  formHeader: {
    position: "fixed",
    marginBottom: "8%",
    paddingHorizontal: "5%",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },

  formFields: {
    width: "90%",
    flexDirection: "column",
    gap: 16,
  },

  formField: {
    gap: 4,
  },

  fieldInput: {
    padding: 4,
    paddingLeft: 8,
    height: 32,
    borderRadius: 6,
    borderColor: "#ced4da",
    borderWidth: 1,
    backgroundColor: "white",
  },

  formButton: {
    backgroundColor: "#70e000",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
  },
});

const textStyles = StyleSheet.create({
  heading: {
    fontSize: 45,
    fontWeight: "600",
    color: "#70e000",
  },

  motto: {
    color: "#70e000",
    fontWeight: "400",
  },

  formHeading: {
    fontWeight: "500",
    fontSize: 18,
  },

  selectedText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },

  unselectedText: {
    fontSize: 14,
    fontWeight: "400",
  },
});

const buttonStyles = StyleSheet.create({
  selectedButton: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#70e000",
  },

  unselectedButton: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#ced4da",
    borderWidth: 1,
  },
});
