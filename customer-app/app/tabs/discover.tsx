import React, { useEffect, useState } from "react";
import * as customerSdk from "../../../sdk/src/routes/customer";
import * as businessSdk from "../../../sdk/src/routes/business";
import * as businessTypesSdk from "../../../sdk/src/routes/businessTypes";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useFocusEffect } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import {
  DiscoverDropdownProvider,
  useDropdown,
} from "@/components/DiscoverDropdownContext";
import { colors } from "@/constants/Colors";

export default function DiscoverWrapper() {
  return (
    <DiscoverDropdownProvider>
      <Discover />
    </DiscoverDropdownProvider>
  );
}

function Discover() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [businesses, setBusinesses] = useState<businessSdk.Business[]>();
  const [open, setOpen] = useState(false);
  const { dropdownValue, setDropdownValue } = useDropdown();
  const [businessTypes, setBusinessesTypes] =
    useState<businessTypesSdk.DropDownPickerItem[]>();

  const getBusinesses = async () => {
    const response = await businessSdk.getRandomBusiness(3, dropdownValue);

    if (response.status === 404) {
      setBusinesses(undefined);
      return;
    }

    if ("error" in response) {
      return;
    }

    setBusinesses(response.json);
  };

  const setTypes = async () => {
    setBusinessesTypes(await businessTypesSdk.getBusinessTypesForDropDown());
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isInitialLoad) {
        getBusinesses();
        setIsInitialLoad(false);
        setTypes();
      }
    }, [isInitialLoad])
  );

  useEffect(() => {
    getBusinesses();
  }, [dropdownValue]);

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
              setOpen={setOpen}
              value={dropdownValue}
              setValue={setDropdownValue}
              items={businessTypes || []}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.grayOutline,
                backgroundColor: colors.darkerBackground,
              }}
              dropDownContainerStyle={{
                justifyContent: "center",
                backgroundColor: colors.darkerBackground,
                borderTopWidth: 0,
                borderWidth: 1,
                borderColor: colors.grayOutline,
              }}
              containerStyle={{ flex: 1 }}
              placeholderStyle={{ color: colors.placeholder }}
              placeholder="Anything"
              scrollViewProps={{
                persistentScrollbar: true,
              }}
              textStyle={{ color: colors.black }}
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
          <View>
            <Text style={{ color: colors.black }}>No businesses available</Text>
          </View>
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
    paddingHorizontal: "6%",
    paddingVertical: "8%",
    backgroundColor: colors.background,
    flexDirection: "column",
    gap: "5%",
  },

  business: {
    height: "24%",
    width: "100%",
    borderColor: colors.grayOutline,
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
    color: colors.black,
  },
});
