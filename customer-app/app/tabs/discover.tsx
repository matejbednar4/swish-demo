import React, { useEffect, useState } from "react";
import * as customerSdk from "../../../sdk/src/routes/customer";
import * as businessSdk from "../../../sdk/src/routes/business";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

export default function Discover() {
  const [businesses, setBusinesses] = useState<businessSdk.Business[]>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Restaurant", value: "restaurant" },
    { label: "Gym", value: "gym" },
    { label: "Hotel", value: "hotel" },
    { label: "Cafe", value: "cafe" },
    { label: "Bar", value: "bar" },
    { label: "Shisha", value: "shisha" },
  ]);

  const getBusinesses = async () => {
    const response = await businessSdk.getRandomBusiness(3);

    if ("error" in response) {
      console.error("Error fetching random places");
      return;
    }

    setBusinesses(response.json);
  };

  useFocusEffect(
    React.useCallback(() => {
      getBusinesses();
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <View style={{ ...styles.mainView }}>
        <View style={{ width: "100%" }}>
          <Text style={textStyles.sectionHeading}>
            Select the type of place you are looking for
          </Text>
          {/* Search box */}
          <View style={searchStyles.box}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ced4da",
                backgroundColor: "#f8f9fa",
              }}
              dropDownContainerStyle={{
                justifyContent: "center",
                backgroundColor: "#f8f9fa",
                borderTopWidth: 0,
                borderWidth: 1,
                borderColor: "#ced4da",
              }}
              containerStyle={{ flex: 1 }}
              placeholderStyle={{ color: "#b1a7a6" }}
              placeholder="Restaurant"
            />
          </View>
        </View>
        {businesses ? (
          businesses.map((business, index) => (
            <View key={index} style={styles.business}>
              <Text>{business.name || "Unnamed Business"}</Text>
              <Text style={{}}>
                Address: {business.address || "No Address Available"}
              </Text>
              <Text style={{}}>
                Type: {business.type || "No Type Available"}
              </Text>
            </View>
          ))
        ) : (
          <Text>No businesses available</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "6%",
    paddingVertical: "8%",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    gap: "5%",
  },

  business: {
    flex: 1,
    width: "100%",
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 8,
  },
});

const searchStyles = StyleSheet.create({
  box: {
    height: 50,
  },

  icon: {
    height: "90%",
    width: "6%",
    resizeMode: "contain",
    marginRight: "1.5%",
    marginLeft: "3%",
  },
});

const textStyles = StyleSheet.create({
  sectionHeading: {
    alignSelf: "flex-start",
    marginBottom: "2%",
    fontWeight: "bold",
  },
});
