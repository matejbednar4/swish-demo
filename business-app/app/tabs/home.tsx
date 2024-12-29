import { getSecureData } from "@/components/global/global";
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

export default function Home() {
  let uid;
  getSecureData("id")
    .then((data) => (uid = data))
    .catch((err) => console.error(err));

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topMenu}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Swish</Text>
          <View
            style={{
              height: "80%",
              width: "83%",
              alignSelf: "center",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "lightgray",
                height: "100%",
                width: "20%",
              }}
            >
              <Text>pfp</Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={{ backgroundColor: "white" }}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: "6%",
            paddingVertical: "8%",
          }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              marginBottom: "2%",
              fontWeight: "bold",
            }}
          >
            Search for a place
          </Text>
          {/* Search box */}
          <View
            style={{
              backgroundColor: "#f8f9fa",
              width: "100%",
              height: "130%",
              borderWidth: 1,
              borderRadius: 8,
              borderBottomRightRadius: 4,
              borderBottomLeftRadius: 4,
              borderColor: "#ced4da",
              paddingHorizontal: "4%",
              justifyContent: "center",
            }}
          >
            <View
              style={[
                styles.searchField,
                { borderBottomWidth: 1, borderColor: "#ced4da" },
              ]}
            >
              <Image
                source={require("../../assets/images/store.png")}
                style={{
                  width: "8%",
                  height: "50%",
                  resizeMode: "contain",
                }}
              ></Image>
              <TextInput
                placeholder="Business name"
                style={{
                  marginLeft: "2.5%",
                  width: "90%",
                  height: "90%",
                }}
                autoCapitalize="none"
              ></TextInput>
            </View>
            <View
              style={[
                styles.searchField,
                { borderBottomWidth: 1, borderColor: "#ced4da" },
              ]}
            >
              <Image
                source={require("../../assets/images/location-pin.png")}
                style={{
                  width: "8%",
                  height: "60%",
                  resizeMode: "contain",
                }}
              ></Image>
              <TextInput
                placeholder="Location"
                style={{
                  marginLeft: "2.5%",
                  width: "90%",
                  height: "90%",
                }}
                autoCapitalize="none"
              ></TextInput>
            </View>
            <View style={styles.searchField}>
              <Image
                source={require("../../assets/images/restaurant.png")}
                style={{
                  width: "8%",
                  height: "55%",
                  resizeMode: "contain",
                }}
              ></Image>
              <TextInput
                placeholder="Business Type"
                style={{
                  marginLeft: "2.5%",
                  width: "90%",
                  height: "90%",
                }}
                autoCapitalize="none"
              ></TextInput>
            </View>
          </View>
          {/* Search button */}
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: "2%",
              backgroundColor: "#70e000",
              borderRadius: 8,
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              paddingVertical: "2.5%",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>Search</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.navigation}>
          <View style={styles.navItem}>
            <Image
              source={require("../../assets/images/search.png")}
              style={styles.navImage}
            ></Image>
            <Text style={styles.navText}>Search</Text>
          </View>
          <View style={styles.navItem}>
            <Image
              source={require("../../assets/images/discover.png")}
              style={styles.navImage}
            ></Image>
            <Text style={styles.navText}>Discover</Text>
          </View>
          <View style={styles.navItem}>
            <Image
              source={require("../../assets/images/favorites.png")}
              style={styles.navImage}
            ></Image>
            <Text style={styles.navText}>Favorites</Text>
          </View>
          <View style={styles.navItem}>
            <Image
              source={require("../../assets/images/account.png")}
              style={styles.navImage}
            ></Image>
            <Text style={styles.navText}>Account</Text>
          </View>
        </View>
      </SafeAreaView>
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
  searchField: {
    flexDirection: "row",
    height: "33%",
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  navigation: {
    height: "8%",
    paddingTop: "4%",
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    position: "fixed",
    borderTopWidth: 0.5,
    borderColor: "#ced4da",
    paddingHorizontal: "6%",
    alignItems: "center",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navImage: {
    width: "100%",
    height: "55%",
    resizeMode: "contain",
    marginBottom: "8%",
  },
  navText: {
    fontWeight: "500",
  },
});
