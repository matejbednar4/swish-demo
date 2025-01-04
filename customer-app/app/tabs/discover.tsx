import { getStoredData, emptyCustomer } from "@/components/global/global";
import { useEffect, useState } from "react";
import * as sdk from "../../../sdk/src/routes/customer";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Discover() {
  const navigation = useNavigation;
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
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: "#ffffff" }}
          contentContainerStyle={styles.scrollView}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text>Swish</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    paddingHorizontal: "6%",
    paddingVertical: "8%",
  },
});
