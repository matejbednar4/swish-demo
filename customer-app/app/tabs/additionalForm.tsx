import { getSecureData } from "@/components/global/global";
import * as sdk from "../../../sdk/src/routes/customer";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdditionalForm({ navigation }: { navigation: any }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [uid, setUid] = useState("");

  const fetchData = async () => {
    try {
      const response = await getSecureData("customer_id");
      if (response) {
        setUid(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      navigation.navigate("Home");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <View style={styles.header}>
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
}

const styles = StyleSheet.create({
  header: {
    marginTop: "30%",
    justifyContent: "flex-end",
    marginBottom: "10%",
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
  formHeading: {
    fontWeight: "500",
    fontSize: 18,
  },
});
