import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BottomNavigation({ navigation }: { navigation: any }) {
  const goToHome = () => {
    navigation.navigate("Home");
  };
  const goToDiscover = () => {
    navigation.navigate("Discover");
  };
  const goToFavorites = () => {
    navigation.navigate("Favorites");
  };
  const goToAccount = () => {
    navigation.navigate("Account");
  };
  return (
    <View style={styles.navigation}>
      <TouchableOpacity style={styles.navItem} onPress={goToHome}>
        <Image
          source={require("../assets/images/search.png")}
          style={styles.navImage}
        ></Image>
        <Text style={styles.navText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToDiscover}>
        <Image
          source={require("../assets/images/discover.png")}
          style={styles.navImage}
        ></Image>
        <Text style={styles.navText}>Discover</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToFavorites}>
        <Image
          source={require("../assets/images/favorites.png")}
          style={styles.navImage}
        ></Image>
        <Text style={styles.navText}>Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToAccount}>
        <Image
          source={require("../assets/images/account.png")}
          style={styles.navImage}
        ></Image>
        <Text style={styles.navText}>Account</Text>
      </TouchableOpacity>
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
