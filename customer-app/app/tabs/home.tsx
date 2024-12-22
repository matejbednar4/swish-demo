import { getSecureData } from "@/components/global/global";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Home() {
  let uid;
  getSecureData("id")
    .then((data) => (uid = data))
    .catch((err) => console.error(err));

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.head}>
        <Text style={styles.swishLogo}>Swish</Text>
        <Text style={styles.userLogo}>{uid}</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text>Search for a place</Text>
        <View style={styles.search}>
          <TextInput>Ahoj</TextInput>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.navItem}>Search</Text>
        <Text style={styles.navItem}>Discover</Text>
        <Text style={styles.navItem}>Favorites</Text>
        <Text style={styles.navItem}>Account</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  head: {
    height: "8%",
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
  },
  swishLogo: { flex: 4 },
  userLogo: { flex: 1 },
  content: { backgroundColor: "white" },
  search: { backgroundColor: "#e2e8f0", width: "80%" },
  footer: {
    height: "5%",
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    position: "fixed",
  },
  navItem: {
    flex: 1,
    textAlign: "center",
  },
});
