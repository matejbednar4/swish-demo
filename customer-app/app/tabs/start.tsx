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

  return (
    <View style={styles.page}>
      <LinearGradient
        colors={["#70e000", "#9ef01a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <ScrollView
        contentContainerStyle={styles.main}
        keyboardShouldPersistTaps="handled"
      >
        <View style={showStart ? styles.header : styles.header2}>
          <Text style={showStart ? styles.heading : styles.heading2}>
            Swish
          </Text>
        </View>
        <View style={showStart ? styles.buttons : styles.buttons2}>
          <TouchableOpacity
            style={
              showStart
                ? styles.firstButton
                : loginForm
                ? styles.firstButton2
                : styles.firstButton3
            }
            onPress={() => {
              showStart ? setShowStart(false) : setShowStart(true);
              // setShowStart(false);
              setLoginForm(true);
            }}
          >
            <Text
              style={
                showStart
                  ? styles.loginText
                  : loginForm
                  ? styles.loginText2
                  : styles.loginText3
              }
            >
              {showStart ? "Log in to an existing account" : "Log In"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              showStart
                ? styles.secondButton
                : loginForm
                ? styles.secondButton2
                : styles.secondButton3
            }
            onPress={() => {
              setShowStart(false);
              setLoginForm(false);
            }}
          >
            <Text
              style={
                showStart
                  ? styles.registerText
                  : loginForm
                  ? styles.registerText2
                  : styles.registerText3
              }
            >
              {showStart ? "Create a new account" : "Register"}
            </Text>
          </TouchableOpacity>
        </View>
        {showStart ? (
          <View></View>
        ) : (
          <View style={styles.formContainer}>
            {loginForm ? <LoginForm /> : <RegisterForm />}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // router.push("./tabs/home");
    const user = { email: email.toLowerCase(), password };
    const response = await fetch(backendUrl + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    await response
      .json()
      .then((data) => {
        if (data.error) {
          console.error("An unknown error occurred. Please try again later.");
          resetFields();
          return;
        }

        switch (data.status) {
          case "loggedIn":
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
      })
      .catch((err) => console.error(err));
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.loginForm}>
      <View style={styles.formHeader}>
        <Text style={styles.formHeading}>Log in to an existing account</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.formText}>Enter your email</Text>
          <TextInput
            placeholder="john@swish.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.formText}>Enter your password</Text>
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        <View></View>
        <TouchableOpacity style={styles.formButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registerForm, setRegisterForm] = useState(true);

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) === false) {
      Alert.alert("Wrong email format.");
      setEmail("");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Password needs to be at least 8 characters long.");
      setPassword("");
      setPasswordConfirmation("");
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert("Passwords do not match.");
      setPasswordConfirmation("");
      return;
    }

    let newUser = { email: email.toLowerCase(), password };

    const response = await fetch(backendUrl + "/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    await response
      .json()
      .then((data) => {
        if (data.error && data.error.Code === 19) {
          Alert.alert("This email is already registered.");
          resetFields();
          return;
        }
        saveSecureData("id", data.id.toString());
      })
      .catch((err) => console.error(err));

    setRegisterForm(false);
    resetFields();
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  return (
    <View style={registerForm ? styles.registerForm : styles.otherForm}>
      {registerForm ? (
        <View style={styles.registerForm}>
          <View style={styles.formHeader}>
            <Text style={styles.formHeading}>Create a new account</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formField}>
              <Text style={styles.formText}>Enter your email</Text>
              <TextInput
                placeholder="adam@swish.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.formText}>Enter your password</Text>
              <TextInput
                placeholder="password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.formText}>Confirm your password</Text>
              <TextInput
                placeholder="password"
                secureTextEntry={true}
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
            <View></View>
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { ...StyleSheet.absoluteFillObject },

  gradient: { ...StyleSheet.absoluteFillObject },

  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },

  header: {
    flex: 1,
    justifyContent: "flex-end",
  },

  header2: {
    marginTop: 20,
    flex: 1.5,
    justifyContent: "flex-end",
  },

  heading: {
    fontFamily: "Inter",
    fontSize: 70,
    color: "white",
  },

  heading2: {
    fontSize: 30,
    color: "white",
  },

  buttons: {
    width: "66%",
    flex: 1.3,
    justifyContent: "flex-start",
    gap: "10",
  },

  buttons2: {
    flexDirection: "row",
    width: "66%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "25",
  },

  firstButton: {
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
  },

  firstButton2: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
  },

  firstButton3: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 8,
  },

  secondButton: {
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 8,
  },

  secondButton2: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 8,
  },

  secondButton3: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
  },

  loginText: {
    fontSize: 16,
  },

  loginText2: {
    fontSize: 14,
  },

  loginText3: {
    color: "white",
    fontSize: 14,
  },

  registerText: {
    color: "white",
    fontSize: 16,
  },

  registerText2: {
    color: "white",
    fontSize: 14,
  },

  registerText3: {
    fontSize: 14,
  },

  registerTextOn: {
    color: "white",
    fontSize: 14,
  },

  formContainer: {
    flex: 9,
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  loginForm: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#38b000",
    borderRadius: 16,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
  },

  otherForm: {},

  registerForm: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#38b000",
    borderRadius: 16,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
  },

  formHeader: {
    height: 66,
    justifyContent: "center",
    alignItems: "center",
  },

  formHeading: {
    color: "white",
  },

  form: {
    flex: 3,
    width: "90%",
    flexDirection: "column",
    gap: 16,
  },

  formField: {
    gap: 4,
  },

  formText: {
    color: "white",
  },

  input: {
    backgroundColor: "white",
    padding: 4,
    paddingLeft: 8,
    height: 32,
    borderRadius: 6,
  },

  formButton: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 6,
  },

  buttonText: {
    color: "white",
  },
});
