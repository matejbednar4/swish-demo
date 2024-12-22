import { backendUrl, getSecureData } from "@/components/global/global";
import { router } from "expo-router";
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

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  const handleButtonClick = async () => {
    if (firstName === "" || lastName === "" || location === "") {
      Alert.alert("You must fill all fields");
      return;
    }

    let id;
    await getSecureData("id")
      .then((value) => (id = Number(value)))
      .catch((err) => console.error(err));
    const data = { id, firstName, lastName, location };

    await fetch(backendUrl + "/user/info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status == 200) {
          router.push("/tabs/home");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.mainBox}>
        <View style={styles.boxForm}>
          <View style={styles.formHeader}>
            <Text></Text>
          </View>
          <View style={styles.formInputs}>
            <TextInput
              placeholder="Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formButtons}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleButtonClick}
            >
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  mainBox: {
    height: "60%",
    width: "75%",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
  },

  boxForm: {
    flex: 8,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#bef264",
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  formHeader: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },

  formInputs: {
    flex: 3,
    width: "80%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
  },

  input: {
    backgroundColor: "white",
    padding: 4,
    height: 32,
    borderRadius: 6,
  },

  formButtons: {
    flex: 1.5,
    flexDirection: "column",
    width: "80%",
    justifyContent: "flex-start",
  },

  submitButton: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
  },
});
