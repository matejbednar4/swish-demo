import { getStoredData, emptyCustomer } from "@/components/global/global";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { AppStackParamList } from "./app";
import BottomNavigation from "@/components/BottomNavigation";
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

type DiscoverScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "Discover"
>;

export default function Discover({
  navigation,
}: {
  navigation: DiscoverScreenNavigationProp;
}) {
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
          <Text>Hello</Text>
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
