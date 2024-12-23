import { backendUrl, saveSecureData } from "@/components/global/global";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
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

  const handleLogin = async () => {
    // create a user object and pass it to backend
    const user = { email: email.toLowerCase(), password };

    try {
      const response = await fetch(backendUrl + "/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      await response.json().then((data) => {
        if (data.error) {
          // if there is an error
          console.error("An unknown error occurred. Please try again later.");
          resetFields();
          return;
        }

        // check what we got back from the API
        switch (data.status) {
          case "loggedIn":
            // if loggedIn, save the UID to local storage for later use
            saveSecureData("id", data.id.toString());
            // router.push("/tabs/home");
            break;
          case "userNotFound":
            Alert.alert("Email not registered.");
            resetFields();
            break;
          case "wrongPassword":
            Alert.alert("Wrong password.");
            setPassword("");
            break;
          default:
            console.error("An unknown error occurred. Please try again later.");
            resetFields();
        }
      });
    } catch (err) {
      console.error(err);
    }
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

    // create a user object and pass it to the backend
    let newUser = { email: email.toLowerCase(), password };

    try {
      // create a new user in the database
      const response = await fetch(backendUrl + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      await response.json().then((data) => {
        if (data.error && data.error.Code === 19) {
          // if its this error, the email is already registered
          Alert.alert("This email is already registered.");
          resetFields();
          return;
        }
        // save UID to local storage for later use
        saveSecureData("id", data.id.toString());
      });
      resetFields();
      navigation.navigate("RegisterForm");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#70e000", "#9ef01a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      {/* Visible content on the scroll screen */}
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          {/* Heading */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Start");
            }}
          >
            <Text>Back</Text>
          </TouchableOpacity>
          <Text style={textStyles.heading}>Swish</Text>
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
            <View style={styles.loginForm}>
              {/* Login form header */}
              <View style={styles.formHeader}>
                <Text>Log in to your account</Text>
              </View>
              {/* Login form fields */}
              <View style={styles.formFields}>
                {/* Each login form field */}
                <View style={styles.formField}>
                  <Text>Enter your email</Text>
                  <TextInput
                    placeholder="john@swish.com"
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
                {/* Login form Button */}
                <TouchableOpacity
                  style={styles.formButton}
                  onPress={handleLogin}
                >
                  <Text style={{ color: "white" }}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // Register form itself
            <View style={styles.registerForm}>
              {/* Register form header */}
              <View style={styles.formHeader}>
                <Text>Create a new account</Text>
              </View>
              {/* Register form fields */}
              <View style={styles.formFields}>
                {/* Each register form field */}
                <View style={styles.formField}>
                  <Text>Enter your email</Text>
                  <TextInput
                    placeholder="john@swish.com"
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
                {/* Register form Button */}
                <TouchableOpacity
                  style={styles.formButton}
                  onPress={handleRegister}
                >
                  <Text style={{ color: "white" }}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 3,
    justifyContent: "flex-end",
  },

  buttons: {
    marginTop: "6%",
    marginBottom: "6%",
    flexDirection: "row",
    width: "66%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "10%",
  },

  formContainer: {
    flex: 12,
    width: "80%",
    justifyContent: "flex-start",
  },

  loginForm: {
    height: "50%",
    alignItems: "center",
    padding: "2%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },

  registerForm: {
    height: "60%",
    alignItems: "center",
    padding: "2%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },

  formHeader: {
    height: 66,
    justifyContent: "center",
    alignItems: "center",
  },

  formFields: {
    flex: 3,
    width: "90%",
    flexDirection: "column",
    gap: 16,
  },

  formField: {
    gap: 4,
  },

  fieldInput: {
    borderWidth: 1,
    padding: 4,
    paddingLeft: 8,
    height: 32,
    borderRadius: 6,
  },

  formButton: {
    backgroundColor: "#70e000",
    height: 32,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
});

const textStyles = StyleSheet.create({
  heading: {
    fontSize: 30,
    color: "white",
  },

  selectedText: {
    fontSize: 14,
  },

  unselectedText: {
    fontSize: 14,
    color: "white",
  },
});

const buttonStyles = StyleSheet.create({
  selectedButton: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "white",
  },

  unselectedButton: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 2,
  },
});
