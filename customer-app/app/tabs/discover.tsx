import React, { useEffect, useState } from "react";
import * as customerSdk from "../../../sdk/src/routes/customer";
import * as businessSdk from "../../../sdk/src/routes/business";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";

export default function Discover() {
  const [businesses, setBusinesses] = useState<businessSdk.Business[]>();

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
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ ...styles.mainView }}>
          <TouchableOpacity>
            <Text>Ahoj</Text>
          </TouchableOpacity>
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
      </SafeAreaView>
    </View>
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
    gap: "8%",
  },

  business: {
    flex: 1,
    width: "100%",
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 8,
  },
});
