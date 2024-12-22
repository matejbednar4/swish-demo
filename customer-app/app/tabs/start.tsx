import { saveSecureData, backendUrl } from "@/components/global/global";
import { router } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function Start() {
  const [showStart, setShowStart] = useState(true);
  const [loginForm, setLoginForm] = useState(true);
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
            router.push("/tabs/home");
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
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
        {/* Header container */}
        <View style={showStart ? styles.startHeader : styles.header}>
          {/* Heading */}
          <Text
            style={showStart ? textStyles.startHeading : textStyles.heading}
          >
            Swish
          </Text>
        </View>
        {/* Login and Register buttons container */}
        <View style={showStart ? styles.startButtons : styles.buttons}>
          {/* Login and Register buttons */}
          <TouchableOpacity
            style={
              showStart
                ? buttonStyles.startLoginButton
                : loginForm
                ? buttonStyles.selectedButton
                : buttonStyles.unselectedButton
            }
            onPress={() => {
              setShowStart(false);
              setLoginForm(true);
            }}
          >
            <Text
              style={
                showStart
                  ? textStyles.startLoginText
                  : loginForm
                  ? textStyles.selectedText
                  : textStyles.unselectedText
              }
            >
              {showStart ? "Log in to an existing account" : "Log in"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              showStart
                ? buttonStyles.startRegisterButton
                : loginForm
                ? buttonStyles.unselectedButton
                : buttonStyles.selectedButton
            }
            onPress={() => {
              setShowStart(false);
              setLoginForm(false);
            }}
          >
            <Text
              style={
                showStart
                  ? textStyles.startRegisterText
                  : loginForm
                  ? textStyles.unselectedText
                  : textStyles.selectedText
              }
            >
              {showStart ? "Create a new account" : "Register"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showStart ? setShowStart(false) : setShowStart(true);
            }}
          >
            <Text>back</Text>
          </TouchableOpacity>
        </View>
        {/* Form container - only visible when showStart is false */}
        {!showStart && (
          // Container of both forms
          <View style={styles.formContainer}>
            {loginForm ? (
              // Login form itself
              <View style={styles.loginForm}>
                {/* Login form header */}
                <View style={styles.formHeader}>
                  <Text style={textStyles.white}>Log in to your account</Text>
                </View>
                {/* Login form fields */}
                <View style={styles.formFields}>
                  {/* Each login form field */}
                  <View style={styles.formField}>
                    <Text style={textStyles.white}>Enter your email</Text>
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
                    <Text style={textStyles.white}>Enter your password</Text>
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
                    <Text style={textStyles.white}>Log in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // Register form itself
              <View style={styles.registerForm}>
                {/* Register form header */}
                <View style={styles.formHeader}>
                  <Text style={textStyles.white}>Create a new account</Text>
                </View>
                {/* Register form fields */}
                <View style={styles.formFields}>
                  {/* Each register form field */}
                  <View style={styles.formField}>
                    <Text style={textStyles.white}>Enter your email</Text>
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
                    <Text style={textStyles.white}>Enter your password</Text>
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
                    <Text style={textStyles.white}>Confirm your password</Text>
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
                    <Text style={textStyles.white}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  startHeader: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "8%",
  },

  header: {
    flex: 3,
    justifyContent: "flex-end",
  },

  startButtons: {
    width: "66%",
    flex: 1.3,
    justifyContent: "flex-start",
    gap: "10",
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
    backgroundColor: "#38b000",
    borderRadius: 16,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },

  registerForm: {
    height: "60%",
    alignItems: "center",
    padding: "2%",
    backgroundColor: "#38b000",
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
    backgroundColor: "white",
    padding: 4,
    paddingLeft: 8,
    height: 32,
    borderRadius: 6,
  },

  formButton: {
    height: 32,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 6,
  },
});

const textStyles = StyleSheet.create({
  startHeading: {
    fontFamily: "Inter",
    fontSize: 70,
    color: "white",
  },

  heading: {
    fontSize: 30,
    color: "white",
  },

  startLoginText: {
    fontSize: 16,
  },

  startRegisterText: {
    fontSize: 16,
    color: "white",
  },

  selectedText: {
    fontSize: 14,
  },

  unselectedText: {
    fontSize: 14,
    color: "white",
  },

  white: {
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
