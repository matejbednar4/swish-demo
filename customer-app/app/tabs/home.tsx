import {
  storeData,
  getStoredData,
  emptyCustomer,
} from "@/components/global/global";
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

export default function Home({ navigation }: { navigation: any }) {
  const [customer, setCustomer] = useState<sdk.Customer>(emptyCustomer);

  const getCustomer = async () => {
    const response = await getStoredData("customer");
    if (!response) return;

    setCustomer(JSON.parse(response));
  };

  const goToDiscover = () => {
    navigation.navigate("Discover");
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopMenu navigation={navigation} /> */}
        <ScrollView
          style={{ backgroundColor: "#ffffff" }}
          contentContainerStyle={styles.scrollView}
        >
          <TouchableOpacity style={styles.findMeAplace} onPress={goToDiscover}>
            <Text style={{ fontWeight: "bold", color: "white" }}>
              Find me a place
            </Text>
          </TouchableOpacity>
          <Search />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const Search = () => {
  return (
    <View style={{ width: "100%" }}>
      <Text style={textStyles.sectionHeading}>Search for a place</Text>
      {/* Search box */}
      <View style={searchStyles.box}>
        <View style={[searchStyles.field, { borderBottomWidth: 1 }]}>
          <Image
            source={require("../../assets/images/store.png")}
            style={searchStyles.icon}
          ></Image>
          <TextInput
            placeholder="Business name"
            style={searchStyles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <View style={[searchStyles.field, { borderBottomWidth: 1 }]}>
          <Image
            source={require("../../assets/images/location-pin.png")}
            style={searchStyles.icon}
          ></Image>
          <TextInput
            placeholder="Location"
            style={searchStyles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <View style={searchStyles.field}>
          <Image
            source={require("../../assets/images/restaurant.png")}
            style={searchStyles.icon}
          ></Image>
          <TextInput
            placeholder="Business Type"
            style={searchStyles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
      </View>
      {/* Search button */}
      <TouchableOpacity style={searchStyles.button}>
        <Text style={textStyles.button}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    paddingHorizontal: "6%",
    paddingVertical: "8%",
  },
  findMeAplace: {
    width: "100%",
    backgroundColor: "#70e000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: "2.5%",
    marginBottom: "8%",
  },
});

const searchStyles = StyleSheet.create({
  box: {
    backgroundColor: "#f8f9fa",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: "#ced4da",
    paddingHorizontal: "4%",
    justifyContent: "center",
  },

  field: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ced4da",
    paddingVertical: "5.5%",
  },

  icon: {
    width: "8%",
    height: "100%",
    resizeMode: "contain",
  },

  textInput: {
    marginLeft: "2.5%",
    width: "90%",
    height: "250%",
  },

  button: {
    width: "100%",
    alignItems: "center",
    marginTop: "2%",
    backgroundColor: "#70e000",
    borderRadius: 8,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    paddingVertical: "2.5%",
  },
});

const textStyles = StyleSheet.create({
  sectionHeading: {
    alignSelf: "flex-start",
    marginBottom: "2%",
    fontWeight: "bold",
  },

  button: {
    fontWeight: "bold",
    color: "white",
  },
});
