import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as sdk from "../../sdk/src/routes/customer";
import { getStoredData } from "./global/global";
import { emptyCustomer } from "./global/global";
import { useNavigation } from "@react-navigation/native";

export default function TopMenu({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  const navigation: any = useNavigation();
  const [customer, setCustomer] = useState<sdk.Customer>(emptyCustomer);

  const getCustomer = async () => {
    const response = await getStoredData("customer");
    if (!response) return;
    setCustomer(JSON.parse(response));
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const goHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={{ height: "100%", width: "20%", justifyContent: "center" }}
        onPress={goHome}
      >
        <Text style={textStyles.heading}>Swish</Text>
      </TouchableOpacity>
      <View style={styles.rightSide}>
        <View style={styles.pfp}>
          <Text style={{ fontSize: 10, fontWeight: 500 }}>
            {customer.firstName}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    height: 50,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 0.5,
    paddingHorizontal: "6%",
    borderColor: "#ced4da",
    flexDirection: "row",
    alignItems: "center",
  },

  rightSide: {
    height: "80%",
    alignSelf: "center",
    alignItems: "flex-end",
    flex: 1,
  },

  pfp: {
    backgroundColor: "lightgray",
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
  },
});

const textStyles = StyleSheet.create({
  heading: { fontWeight: "bold", fontSize: 20 },
});
