import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as sdk from "../../sdk/src/routes/customer";
import { getStoredData } from "./global/global";
import { emptyCustomer } from "./global/global";
import { AppStackParamList } from "@/app/tabs/app";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<AppStackParamList, "Home">;

export default function TopMenu({ navigation }: { navigation: any }) {
  const [customer, setCustomer] = useState<sdk.Customer>(emptyCustomer);

  const getCustomer = async () => {
    const response = await getStoredData("customer");
    if (!response) return;
    setCustomer(JSON.parse(response));
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <View style={styles.topMenu}>
      <TouchableOpacity
        style={{ height: "80%", justifyContent: "center" }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={textStyles.heading}>Swish</Text>
      </TouchableOpacity>
      <View style={styles.rightSide}>
        <View style={styles.pfp}>
          <Text>{customer.firstName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topMenu: {
    height: "8%",
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    position: "fixed",
    borderBottomWidth: 0.5,
    paddingHorizontal: "6%",
    borderColor: "#ced4da",
  },

  rightSide: {
    height: "80%",
    width: "83%",
    alignSelf: "center",
    alignItems: "flex-end",
  },

  pfp: {
    backgroundColor: "lightgray",
    height: "100%",
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
  },
});

const textStyles = StyleSheet.create({
  heading: { fontWeight: "bold", fontSize: 20 },
});
