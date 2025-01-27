import { useCustomer } from "@/components/CustomerContext";
import { storeData } from "@/components/global/global";
import { colors } from "@/constants/Colors";
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
import * as customerSdk from "../../../shared/sdk/src/routes/customer";
import { useEffect, useRef, useState } from "react";
import { Pencil } from "@/components/Svg";

export default function Settings() {
  const router = useRouter();
  const { customer, setCustomer } = useCustomer() as any;

  const logOut = () => {
    storeData("jwt", "");
    setCustomer(undefined);
    router.push("/");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      style={{ backgroundColor: colors.background }}
    >
      <AccountDetails customer={customer} setCustomer={setCustomer} />
      <TouchableOpacity
        onPress={logOut}
        style={{
          backgroundColor: colors.black,
          width: "100%",
          marginTop: "2%",
          paddingVertical: "2%",
          borderRadius: 4,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.background, fontWeight: "600" }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const AccountDetails = ({
  customer,
  setCustomer,
}: {
  customer: customerSdk.Customer;
  setCustomer: React.Dispatch<React.SetStateAction<customerSdk.Customer>>;
}) => {
  const [nameEditable, setNameEditable] = useState(false);
  const [addressEditable, setAddressEditable] = useState(false);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const firstNameInputRef = useRef<TextInput>(null);
  const [newStreet, setNewStreet] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const streetInputRef = useRef<TextInput>(null);

  const cancelAllEdits = () => {
    setNameEditable(false);
    setAddressEditable(false);
    nameFunctions.resetFields();
    addressFunctions.resetFields();
  };

  const updateCustomer = async () => {
    cancelAllEdits();
  };

  const nameFunctions = {
    resetFields: () => {
      setNewFirstName("");
      setNewLastName("");
    },
    edit: () => {
      cancelAllEdits();
      setNameEditable(true);
      setTimeout(() => firstNameInputRef.current?.focus(), 100);
    },
    // submit: async () => {
    //   if (newFirstName === "" || newLastName === "") {
    //     Alert.alert("You must fill all of the address fields");
    //     return;
    //   }

    //   const data = {
    //     firstName: newFirstName,
    //     lastName: newLastName,
    //   };

    //   const response = await customerSdk.updateCustomerName(customer.id, data);

    //   if ("error" in response) {
    //     console.error(response.error);
    //     cancelAllEdits();
    //     return;
    //   }

    //   if (response.status === 200) {
    //     updateCustomer();
    //     return;
    //   }
    // },
  };

  const addressFunctions = {
    resetFields: () => {
      setNewStreet("");
      setNewPostalCode("");
      setNewCity("");
      setNewState("");
      setNewCountry("");
    },
    edit: () => {
      cancelAllEdits();
      setAddressEditable(true);
      setTimeout(() => streetInputRef.current?.focus(), 100);
    },
    // submit: async () => {
    //   const falseConditions =
    //     newStreet === "" ||
    //     newPostalCode === "" ||
    //     newCity === "" ||
    //     newCountry === "";

    //   if (falseConditions) {
    //     Alert.alert("You must fill all of the address fields");
    //     return;
    //   }

    //   const data = {
    //     street: newStreet,
    //     postalCode: newPostalCode,
    //     city: newCity,
    //     state: newState,
    //     country: newCountry,
    //   };

    //   const response = await customerSdk.updateCustomerAddress(
    //     customer.id,
    //     data
    //   );

    //   if (response.status === 404) {
    //     Alert.alert("The provided address does not exist");
    //     cancelAllEdits();
    //     return;
    //   }

    //   if ("error" in response) {
    //     console.error(response.error);
    //     cancelAllEdits();
    //     return;
    //   }

    //   if (response.status === 200) {
    //     updateCustomer();
    //     return;
    //   }
    // },
  };

  useEffect(() => {
    setNameEditable(false);
    setAddressEditable(false);
  }, []);

  return (
    <View style={{ width: "100%" }}>
      <Text style={textStyles.sectionHeading}>Account Details</Text>
      {/* Search box */}
      <View style={detailStyles.box}>
        {/* First Field */}
        <View style={detailStyles.field}>
          <View style={detailStyles.inputWrapper}>
            <Text style={textStyles.detailHeading}>Full Name:</Text>
            <TextInput
              ref={firstNameInputRef}
              editable={!nameEditable ? false : true}
              value={newFirstName}
              onChangeText={setNewFirstName}
              placeholder={
                !nameEditable ? `${customer.fullName}` : "_ _ _ _ _ _ _ _"
              }
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              style={detailStyles.input}
            />
          </View>
          {!nameEditable ? (
            <TouchableOpacity
              style={detailStyles.pencilWrapper}
              onPress={nameFunctions.edit}
            >
              <Pencil height={"130%"} width={"100%"} fill={colors.black} />
            </TouchableOpacity>
          ) : (
            <View style={detailStyles.changeButtonsWrapper}>
              <TouchableOpacity
              // onPress={nameFunctions.submit}
              >
                <Text>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelAllEdits}>
                <Text>NO</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* Second Field */}
        <View
          style={[
            detailStyles.field,
            { borderBottomWidth: 1, marginTop: "5%" },
          ]}
        >
          <View style={detailStyles.inputWrapper}>
            <Text style={textStyles.detailHeading}>Address</Text>
          </View>
          {!addressEditable ? (
            <TouchableOpacity
              style={detailStyles.pencilWrapper}
              onPress={addressFunctions.edit}
            >
              <Pencil height={"130%"} width={"100%"} fill={colors.black} />
            </TouchableOpacity>
          ) : (
            <View style={detailStyles.changeButtonsWrapper}>
              <TouchableOpacity
              // onPress={addressFunctions.submit}
              >
                <Text>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelAllEdits}>
                <Text>NO</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={detailStyles.field}>
          <View style={detailStyles.inputWrapper}>
            <Text style={textStyles.detailHeading}>
              {addressEditable ? "Street*" : "Street:"}
            </Text>
            <TextInput
              ref={streetInputRef}
              editable={!addressEditable ? false : true}
              value={newStreet}
              onChangeText={setNewStreet}
              placeholder={
                !addressEditable
                  ? `${customer.address?.street}`
                  : "_ _ _ _ _ _ _ _"
              }
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              style={detailStyles.input}
            />
          </View>
        </View>
        <View style={detailStyles.field}>
          <View style={detailStyles.inputWrapper}>
            <Text style={textStyles.detailHeading}>
              {addressEditable ? "ZIP Code*" : "ZIP Code:"}
            </Text>
            <TextInput
              editable={!addressEditable ? false : true}
              value={newPostalCode}
              onChangeText={setNewPostalCode}
              placeholder={
                !addressEditable
                  ? `${customer.address?.zip}`
                  : "_ _ _ _ _ _ _ _"
              }
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              style={detailStyles.input}
            />
          </View>
        </View>
        {customer.address?.region ||
          (addressEditable && (
            <View style={detailStyles.field}>
              <View style={detailStyles.inputWrapper}>
                <Text style={textStyles.detailHeading}>
                  {addressEditable ? "Region" : "Region:"}
                </Text>
                <TextInput
                  editable={!addressEditable ? false : true}
                  value={newState}
                  onChangeText={setNewState}
                  placeholder={
                    !addressEditable
                      ? `${customer.address?.region}`
                      : "_ _ _ _ _ _ _ _"
                  }
                  placeholderTextColor={colors.placeholder}
                  autoCapitalize="none"
                  style={detailStyles.input}
                />
              </View>
            </View>
          ))}
        <View style={detailStyles.field}>
          <View style={detailStyles.inputWrapper}>
            <Text style={textStyles.detailHeading}>
              {addressEditable ? "City*" : "City:"}
            </Text>
            <TextInput
              editable={!addressEditable ? false : true}
              value={newCity}
              onChangeText={setNewCity}
              placeholder={
                !addressEditable
                  ? `${customer.address?.city}`
                  : "_ _ _ _ _ _ _ _"
              }
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              style={detailStyles.input}
            />
          </View>
        </View>
        <View style={detailStyles.field}>
          <View style={detailStyles.inputWrapper}>
            <Text style={textStyles.detailHeading}>
              {addressEditable ? "Country*" : "Country:"}
            </Text>
            <TextInput
              editable={!addressEditable ? false : true}
              value={newCountry}
              onChangeText={setNewCountry}
              placeholder={
                !addressEditable
                  ? `${customer.address?.country}`
                  : "_ _ _ _ _ _ _ _"
              }
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              style={detailStyles.input}
            />
          </View>
        </View>
      </View>
      {/* Search button */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    paddingHorizontal: "6%",
    paddingVertical: "8%",
  },
});

const textStyles = StyleSheet.create({
  sectionHeading: {
    alignSelf: "flex-start",
    marginBottom: "2%",
    fontWeight: "bold",
    color: colors.black,
  },

  detailHeading: {
    fontWeight: "500",
    color: colors.black,
  },
});

const detailStyles = StyleSheet.create({
  box: {
    backgroundColor: colors.darkerBackground,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: colors.grayOutline,
    paddingHorizontal: "4%",
    justifyContent: "center",
  },

  field: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: colors.grayOutline,
    paddingVertical: "5.5%",
  },

  inputWrapper: {
    flexDirection: "row",
    width: "85%",
    paddingRight: "5%",
  },

  input: {
    marginLeft: "5%",
    width: "100%",
    flexShrink: 1,
  },

  pencilWrapper: {
    width: "10%",
  },

  changeButtonsWrapper: {
    flexDirection: "row",
    gap: "5%",
  },
});
