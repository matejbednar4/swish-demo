import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "@/constants/styles/registerForm";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as authSDK from "../../../../shared/sdk/src/routes/auth";
import * as customerSDK from "../../../../shared/sdk/src/routes/customer";
import { getStoredData, storeData } from "@/components/global/global";
import { colors } from "@/constants/Colors";
import * as ImageManipulator from "expo-image-manipulator";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [pfpAdded, setPfpAdded] = useState(false);

  const router = useRouter();

  const scrollViewRef = useRef<ScrollView>(null);
  const partPositions = useRef<number[]>([]);
  const screenHeight = Dimensions.get("window").height;
  const scrollToPart = (index: number) => {
    if (partPositions.current[index] !== undefined) {
      scrollViewRef.current?.scrollTo({
        y: partPositions.current[index],
        animated: true,
      });
    }
  };

  const handleFirstPart = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert("Passwords do not match");
      return;
    }

    const customer = { email, password };
    const response = await authSDK.registerCustomer(customer);
    const json = response.json;

    if ("error" in json) {
      const error = json.error as any;
      if (error.code === "P2002") {
        Alert.alert("This email is already registered");
        return;
      }

      error.forEach((e: any) => {
        if (e.path[0] === "email") {
          Alert.alert("Invalid email format");
        }
        if (e.path[0] === "password") {
          Alert.alert("Password must be at least 8 characters long");
        }
      });
    }

    if ("token" in json && response.status === 200) {
      storeData("jwt", json.token);
      scrollToPart(1);
    }
  };

  const handleSecondPart = async () => {
    if (
      fullName === "" ||
      street === "" ||
      city === "" ||
      zip === "" ||
      country === ""
    ) {
      Alert.alert("You must fill all of the fields marked with *");
      return;
    }

    const data = { fullName, address: { street, city, zip, region, country } };
    const jwt = await getStoredData("jwt");

    if (!jwt || jwt === "") {
      router.push("../index");
      return;
    }

    const response = await customerSDK.updateLoggedInCustomer(jwt, data);

    if (response.status === 200) {
      scrollToPart(2);
    }
  };

  const continueWithoutPfp = () => {
    router.push("/tabs/app");
  };

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
      const selectedImageUri = result.assets[0].uri;
      const manipulator = ImageManipulator.ImageManipulator;
      const context = manipulator.manipulate(selectedImageUri);
      let resizedImage = await context
        .resize({ width: 500, height: 500 })
        .renderAsync();
      const savedImage = await resizedImage.saveAsync({
        format: ImageManipulator.SaveFormat.JPEG,
        compress: 1,
      });
      const savedImageUri = savedImage.uri;

      setSelectedImage(savedImageUri);
      setPfpAdded(true);
    }
  };

  const submitProfilePic = async () => {
    router.push("/tabs/app");

    if (!selectedImage) return;

    const jwt = await getStoredData("jwt");
    if (!jwt || jwt === "") {
      router.push("../index");
      return;
    }

    const response = await customerSDK.updateLoggedInCustomerPfp(
      jwt,
      selectedImage
    );

    if ("error" in response) console.error(response.error);
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        {/* First Part */}
        <View
          style={{ flex: 1, height: screenHeight, alignItems: "center" }}
          onLayout={(event) =>
            (partPositions.current[0] = event.nativeEvent.layout.y)
          }
        >
          <View style={styles.header}>
            <Text style={styles.heading}>Swish</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.unselectedButton}
              onPress={() => router.push("/tabs/auth/loginForm")}
            >
              <Text style={styles.unselectedText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectedButton}>
              <Text style={styles.selectedText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <View style={styles.formHeader}>
                <Text style={styles.formHeading}>Create a new account</Text>
              </View>
              <View style={styles.formFields}>
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
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleFirstPart}
            >
              <Text style={{ color: colors.background, fontWeight: "600" }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Second Part */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            height: screenHeight,
          }}
          onLayout={(event) =>
            (partPositions.current[1] = event.nativeEvent.layout.y)
          }
        >
          <View style={{ ...styles.formContainer, justifyContent: "center" }}>
            <View>
              <View style={styles.form}>
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
                <View style={styles.formFields}>
                  <View style={styles.fieldRow}>
                    <View style={styles.field}>
                      <Text style={{ color: colors.black }}>Full Name*</Text>
                      <TextInput
                        placeholder="John Smith"
                        placeholderTextColor={colors.placeholder}
                        value={fullName}
                        onChangeText={setFullName}
                        style={styles.fieldInput}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                  <View style={styles.fieldRow}>
                    <View style={styles.field}>
                      <Text style={{ color: colors.black }}>Street*</Text>
                      <TextInput
                        placeholder="2nd Street 23"
                        placeholderTextColor={colors.placeholder}
                        value={street}
                        onChangeText={setStreet}
                        style={styles.fieldInput}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                  <View style={styles.fieldRow}>
                    <View style={styles.field}>
                      <Text style={{ color: colors.black }}>City*</Text>
                      <TextInput
                        placeholder="New York City"
                        placeholderTextColor={colors.placeholder}
                        value={city}
                        onChangeText={setCity}
                        style={styles.fieldInput}
                        autoCapitalize="none"
                      />
                    </View>
                    <View style={styles.field}>
                      <Text style={{ color: colors.black }}>Zip Code*</Text>
                      <TextInput
                        placeholder="12345"
                        placeholderTextColor={colors.placeholder}
                        value={zip}
                        onChangeText={setZip}
                        style={styles.fieldInput}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                  <View style={styles.fieldRow}>
                    <View style={styles.field}>
                      <Text style={{ color: colors.black }}>Region</Text>
                      <TextInput
                        placeholder="New York"
                        placeholderTextColor={colors.placeholder}
                        value={region}
                        onChangeText={setRegion}
                        style={styles.fieldInput}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                  <View style={styles.fieldRow}>
                    <View style={styles.field}>
                      <Text style={{ color: colors.black }}>Country*</Text>
                      <TextInput
                        placeholder="United States"
                        placeholderTextColor={colors.placeholder}
                        value={country}
                        onChangeText={setCountry}
                        style={styles.fieldInput}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.formButton}
                onPress={handleSecondPart}
              >
                <Text style={{ color: colors.background, fontWeight: "600" }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{ height: screenHeight }}
          onLayout={(event) =>
            (partPositions.current[2] = event.nativeEvent.layout.y)
          }
        >
          <View
            style={{
              width: "80%",
              height: "100%",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View style={styles.pfpForm}>
              {/* form header */}
              <View style={styles.pfpFormHeader}>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 18,
                    color: colors.black,
                  }}
                >
                  Add a Profile Picture
                </Text>
              </View>
              <View style={styles.pfpFormMiddle}>
                <TouchableOpacity style={styles.pfpFormPfp} onPress={pickImage}>
                  {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.pfp} />
                  ) : (
                    <Text style={styles.addPfp}>Add a picture</Text>
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
              <TouchableOpacity
                style={styles.formButton}
                onPress={submitProfilePic}
              >
                <Text style={{ color: colors.background, fontWeight: "600" }}>
                  Use this Profile Picture
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
