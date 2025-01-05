import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as sdk from "../../sdk/src/routes/customer";
import { getStoredData } from "./global/global";
import { emptyCustomer } from "./global/global";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function TopMenu({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  const navigation: any = useNavigation();
  const [customer, setCustomer] = useState<sdk.Customer>(emptyCustomer);
  const [home, setHome] = useState(false);

  const route = useRoute();

  const getCustomer = async () => {
    const response = await getStoredData("customer");
    if (!response) return;
    setCustomer(JSON.parse(response));
  };

  const getRoute = () => {
    if (route.name === "Home") setHome(true);
  };

  useEffect(() => {
    getCustomer();
    getRoute();
  }, []);

  const goHome = () => {
    navigation.navigate("Home");
  };

  const goToAccount = () => {
    navigation.navigate("Account");
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={{ height: "100%", width: "20%", justifyContent: "center" }}
        onPress={goHome}
      >
        <Text style={home ? textStyles.selectedHeading : textStyles.heading}>
          Swish
        </Text>
      </TouchableOpacity>
      <View style={styles.rightSide}>
        <TouchableOpacity style={styles.pfp} onPress={goToAccount}>
          <Text style={{ fontSize: 10, fontWeight: 500 }}>
            {customer.firstName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    height: 60,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 0.5,
    paddingHorizontal: "6%",
    paddingVertical: "2%",
    borderColor: "#ced4da",
    flexDirection: "row",
    alignItems: "center",
  },

  rightSide: {
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },

  pfp: {
    backgroundColor: "#ffffff",
    borderColor: "#ced4da",
    borderWidth: 0.5,
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
  },
});

const textStyles = StyleSheet.create({
  heading: { fontWeight: "bold", fontSize: 20 },
  selectedHeading: { fontWeight: "bold", fontSize: 20, color: "#70e000" },
  balance: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
});
