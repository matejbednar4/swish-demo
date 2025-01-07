import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { getStoredData, storeData } from "@/components/global/global";
import { router, useRouter } from "expo-router";
import * as customerSdk from "../../sdk/src/routes/customer";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

export default function Index() {
  const [start, setStart] = useState(true);
  const [loginForm, setLoginForm] = useState(true);
  const [firstForm, setFirstForm] = useState(true);
  const [uid, setUid] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const checkIfSignedIn = async () => {
    const response = await getStoredData("customer");
    // If there is no customer stored locally
    if (!response || response === "") {
      setIsLoading(false);
      return;
    }

    const customer: customerSdk.Customer = JSON.parse(response);
    // Check if the customer also exists in the backend
    const backendResponse = await customerSdk.getCustomerById(customer.id);
    if ("error" in backendResponse) {
      setIsLoading(false);
      return;
    }
    if (backendResponse.status !== 200) {
      setIsLoading(false);
      return;
    }
    // Check if the customer in the backend is the same as the customer in storedData
    if (backendResponse.json.email !== customer.email) {
      setIsLoading(false);
      return;
    }

    if (backendResponse.json.filled === 0) {
      setIsLoading(false);
      setUid(customer.id);
      setStart(false);
      setFirstForm(false);
    }

    if (backendResponse.json.filled === 1) {
      setIsLoading(false);
      router.push("/tabs/app");
    }
  };

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

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
  const router = useRouter();
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

    const response = await customerSdk.registerCustomer(
      lowercaseEmail,
      password
    );

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

    const response = await customerSdk.customerLogin(lowercaseEmail, password);
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
    const response = await customerSdk.getCustomerById(uid);

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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
                  <Text style={{ color: colors.black }}>
                    Enter your password
                  </Text>
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
                  <Text style={{ color: colors.black }}>
                    Enter your password
                  </Text>
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
                <View style={styles.formField}>
                  <Text>Confirm your password</Text>
                  <TextInput
                    placeholder="password"
                    placeholderTextColor={colors.placeholder}
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
              <Text style={{ color: colors.background, fontWeight: "600" }}>
                Log in
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleRegister}
            >
              <Text style={{ color: colors.background, fontWeight: "600" }}>
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
  const [profilePicForm, setProfilePicForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const saveCustomer = async (): Promise<boolean> => {
    const response = await customerSdk.getCustomerById(Number(uid));

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

  const submitFirstForm = async () => {
    if (firstName === "" || lastName === "" || address === "") {
      Alert.alert("You must fill all of the fields");
      return;
    }

    const data = { firstName, lastName, address };
    const response = await customerSdk.updateCustomer(Number(uid), data);

    if ("error" in response) {
      console.error(response.error);
      return;
    }

    if (response.status === 200) {
      if (await saveCustomer()) setProfilePicForm(true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
          {!profilePicForm ? (
            <View>
              <View style={styles.form}>
                {/* form header */}
                <View style={styles.formHeader}>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 18,
                      color: colors.black,
                    }}
                  >
                    Provide additional information
                  </Text>
                </View>
                {/* form fields */}
                <View style={styles.formFields}>
                  {/* Each form field */}
                  <View style={styles.formField}>
                    <Text style={{ color: colors.black }}>
                      Enter your first name
                    </Text>
                    <TextInput
                      placeholder="John"
                      placeholderTextColor={colors.placeholder}
                      value={firstName}
                      onChangeText={setFirstName}
                      style={styles.fieldInput}
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.formField}>
                    <Text style={{ color: colors.black }}>
                      Enter your last name
                    </Text>
                    <TextInput
                      placeholder="Smith"
                      placeholderTextColor={colors.placeholder}
                      value={lastName}
                      onChangeText={setLastName}
                      style={styles.fieldInput}
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.formField}>
                    <Text style={{ color: colors.black }}>
                      Enter your Address
                    </Text>
                    <TextInput
                      placeholder="1st St 44, NYC, New York, USA"
                      placeholderTextColor={colors.placeholder}
                      value={address}
                      onChangeText={setAddress}
                      style={styles.fieldInput}
                      autoCapitalize="none"
                    />
                  </View>
                  {/* form Button */}
                </View>
              </View>
              <TouchableOpacity
                style={styles.formButton}
                onPress={submitFirstForm}
              >
                <Text style={{ color: colors.background, fontWeight: "600" }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ProfilePicForm uid={uid} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const ProfilePicForm = ({ uid }: { uid: number }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [pfpAdded, setPfpAdded] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photo library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.assets) {
      return;
    }

    if (result.assets.length > 1) {
      Alert.alert("You can only select 1 Image.");
      return;
    }

    if (result.assets.length === 1) {
      setSelectedImage(result.assets[0].uri);
      setPfpAdded(true);
    }
  };

  const continueWithoutPfp = () => {
    router.push("/tabs/app");
  };

  const submitProfilePic = async () => {
    if (!selectedImage) return;
    const response = await customerSdk.addProfilePic(uid, selectedImage);

    if ("error" in response) {
      console.error(response.error);
      return;
    }

    if (response.status === 200) {
      console.log("pfp added");
      router.push("/tabs/app");
    }
  };

  return (
    <View>
      <View style={styles.pfpForm}>
        {/* form header */}
        <View style={styles.pfpFormHeader}>
          <Text
            style={{ fontWeight: "500", fontSize: 18, color: colors.black }}
          >
            Add a Profile Picture
          </Text>
        </View>
        <View style={styles.pfpFormMiddle}>
          <TouchableOpacity style={styles.pfpFormPfp} onPress={pickImage}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.pfp} />
            ) : (
              <Text style={textStyles.addPfp}>Add a picture</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.pfpFormBottom}></View>
      </View>
      {!pfpAdded ? (
        <TouchableOpacity
          style={styles.formButton}
          onPress={continueWithoutPfp}
        >
          <Text style={{ color: colors.background, fontWeight: "600" }}>
            Continue without profile picture
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.formButton} onPress={submitProfilePic}>
          <Text style={{ color: colors.background, fontWeight: "600" }}>
            Use this Profile Picture
          </Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: colors.darkerBackground,
    borderRadius: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: "5%",
    borderColor: colors.grayOutline,
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
    borderColor: colors.grayOutline,
    borderWidth: 1,
    backgroundColor: colors.background,
  },

  formButton: {
    backgroundColor: colors.green,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
  },

  pfpForm: {
    position: "fixed",
    alignItems: "center",
    backgroundColor: colors.darkerBackground,
    borderRadius: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: "5%",
    borderColor: colors.grayOutline,
    borderWidth: 1,
    aspectRatio: 1,
  },

  pfpFormHeader: {
    flex: 1,
    position: "fixed",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },

  pfpFormMiddle: {
    flex: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  pfpFormBottom: {
    flex: 1,
  },

  pfpFormPfp: {
    height: "70%",
    aspectRatio: 1,
    backgroundColor: colors.background,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: colors.grayOutline,
    justifyContent: "center",
    alignItems: "center",
  },

  pfp: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: "50%",
  },
});

const textStyles = StyleSheet.create({
  startHeading: {
    position: "absolute",
    fontWeight: "700",
    fontSize: 70,
    color: colors.background,
    paddingBottom: "1.5%",
  },

  motto: {
    color: colors.background,
    fontWeight: "400",
  },

  startLoginText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },

  startRegisterText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.background,
  },
  heading: {
    fontSize: 45,
    fontWeight: "600",
    color: colors.green,
  },

  formHeading: {
    fontWeight: "500",
    fontSize: 18,
    color: colors.black,
  },

  selectedText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.background,
  },

  unselectedText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.black,
  },

  addPfp: {
    color: colors.placeholder,
    fontWeight: "500",
  },
});

const buttonStyles = StyleSheet.create({
  startLoginButton: {
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.background,
  },

  startRegisterButton: {
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colors.background,
    borderWidth: 2,
  },

  selectedButton: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.green,
  },

  unselectedButton: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colors.grayOutline,
    borderWidth: 1,
  },
});
