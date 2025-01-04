import { Image, StyleSheet, Text, View } from "react-native";

export default function BottomNavigation() {
  return (
    <View style={styles.navigation}>
      <View style={styles.navItem}>
        <Image
          source={require("../assets/images/search.png")}
          style={styles.navImage}
        ></Image>
        <Text style={styles.navText}>Search</Text>
      </View>
      <View style={styles.navItem}>
        <Image
          source={require("../assets/images/discover.png")}
          style={styles.navImage}
        ></Image>
        <Text style={styles.navText}>Discover</Text>
      </View>
      <View style={styles.navItem}>
        <Image
          source={require("../assets/images/favorites.png")}
          style={styles.navImage}
        ></Image>
        <Text style={styles.navText}>Favorites</Text>
      </View>
      <View style={styles.navItem}>
        <Image
          source={require("../assets/images/account.png")}
          style={styles.navImage}
        ></Image>
        <Text style={styles.navText}>Account</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
