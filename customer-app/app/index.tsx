import { LinearGradient } from "expo-linear-gradient";
import * as sdk from "../../sdk/src/routes/customer";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { getStoredData, storeData } from "@/components/global/global";
import { useRouter } from "expo-router";

export default function Index() {
  const [start, setStart] = useState(true);
  const [loginForm, setLoginForm] = useState(true);
  const [firstForm, setFirstForm] = useState(true);
  const [uid, setUid] = useState(0);

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <LinearGradient
        colors={["#70e000", "#9ef01a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {start ? (
        <Start setStart={setStart} setLoginForm={setLoginForm} />
      ) : firstForm ? (
        <FirstForm
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          setFirstForm={setFirstForm}
          setUid={setUid}
        />
      ) : (
        <AdditionalForm uid={uid} />
      )}
    </View>
  );
}

const Start = ({
  setStart,
  setLoginForm,
}: {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, alignItems: "center" }}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >
      {/* Header container */}
      <View style={styles.startHeader}>
        {/* Heading */}
        <Text style={textStyles.startHeading}>Swish</Text>
        <Text style={textStyles.motto}>Experience And Inspire</Text>
      </View>
      {/* Login and Register buttons container */}
      <View style={styles.startButtons}>
        {/* Login and Register buttons */}
        <TouchableOpacity
          style={buttonStyles.startLoginButton}
          onPress={() => {
            setStart(false);
            setLoginForm(true);
          }}
        >
          <Text style={textStyles.startLoginText}>
            Log in to an existing account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyles.startRegisterButton}
          onPress={() => {
            setStart(false);
            setLoginForm(false);
          }}
        >
          <Text style={textStyles.startRegisterText}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const FirstForm = ({
  loginForm,
  setLoginForm,
  setFirstForm,
  setUid,
}: {
  loginForm: boolean;
  setLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstForm: React.Dispatch<React.SetStateAction<boolean>>;
  setUid: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

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

    const response = await sdk.registerCustomer(lowercaseEmail, password);

    if ("error" in response) {
      console.error(response.error);
      return;
    }

    if (response.status === 409) {
      Alert.alert("This email is already registered.");
      resetFields();
      return;
    }

    if (response.status === 201) {
      setUid(response.json.id);
      setFirstForm(false);
    }
  };

  const handleLogin = async () => {
    const lowercaseEmail = email.toLowerCase();

    const response = await sdk.customerLogin(lowercaseEmail, password);
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

  const loginUser = async (uid: number) => {
    const response = await sdk.getCustomerById(uid);

    if ("error" in response) {
      console.error(response.error);
      return;
    }

    if (response.json.filled === 0) {
      // if the customer has not yet filled the additional form
      setUid(response.json.id);
      setFirstForm(false);
      return;
    }

    if (response.status === 200) {
      storeData("customer", JSON.stringify(response.json));
      router.push("/tabs/app");
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
                  Log in to your account
                </Text>
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
              </View>
            </View>
          ) : (
            // Register form itself
            <View style={styles.form}>
              {/* Register form header */}
              <View style={styles.formHeader}>
                <Text style={textStyles.formHeading}>Create a new account</Text>
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
};

const AdditionalForm = ({ uid }: { uid: number }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const saveCustomer = async (): Promise<boolean> => {
    const response = await sdk.getCustomerById(Number(uid));

    if ("error" in response) {
      console.error(response.error);
      return false;
    }

    if (response.json.filled === 0) {
      console.error("Form not filled");
      return false;
    }

    if (response.status === 200) {
      storeData("customer", JSON.stringify(response.json));
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    if (firstName === "" || lastName === "" || address === "") {
      Alert.alert("You must fill all of the fields");
      return;
    }

    const data = { firstName, lastName, address };
    const response = await sdk.updateCustomer(Number(uid), data);

    if ("error" in response) {
      console.error(response.error);
      return;
    }

    if (response.status === 200) {
      if (await saveCustomer()) router.push("/tabs/app");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <View
          style={{
            marginTop: "30%",
            justifyContent: "flex-end",
            marginBottom: "10%",
          }}
        >
          {/* Heading */}
          <Text style={textStyles.heading}>Swish</Text>
        </View>
        <View style={styles.formContainer}>
          {/*form itself */}
          <View style={styles.form}>
            {/* form header */}
            <View style={styles.formHeader}>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                Provide additional information
              </Text>
            </View>
            {/* form fields */}
            <View style={styles.formFields}>
              {/* Each form field */}
              <View style={styles.formField}>
                <Text>Enter your first name</Text>
                <TextInput
                  placeholder="John"
                  value={firstName}
                  onChangeText={setFirstName}
                  style={styles.fieldInput}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.formField}>
                <Text>Enter your last name</Text>
                <TextInput
                  placeholder="Smith"
                  value={lastName}
                  onChangeText={setLastName}
                  style={styles.fieldInput}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.formField}>
                <Text>Enter your Address</Text>
                <TextInput
                  placeholder="1st St 44, NYC, New York, USA"
                  value={address}
                  onChangeText={setAddress}
                  style={styles.fieldInput}
                  autoCapitalize="none"
                />
              </View>
              {/* form Button */}
            </View>
          </View>
          <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
            <Text style={{ color: "white", fontWeight: "600" }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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
  header: {
    marginTop: "30%",
    justifyContent: "flex-end",
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
  heading: {
    fontSize: 45,
    fontWeight: "600",
    color: "#70e000",
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
