import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Home from "../assets/images/home.svg";

export default function BottomNavigation({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [home, setHome] = useState(false);
  const [discover, setDiscover] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [account, setAccount] = useState(false);

  const reset = () => {
    setHome(false);
    setDiscover(false);
    setFavorites(false);
    setAccount(false);
  };

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

  const getRoute = () => {
    switch (route.name) {
      case "Home":
        reset();
        setHome(true);
        break;
      case "Discover":
        reset();
        setDiscover(true);
        break;
      case "Favorites":
        reset();
        setFavorites(true);
        break;
      case "Account":
        reset();
        setAccount(true);
        break;
      default:
        reset();
    }
  };

  useEffect(() => {
    getRoute();
  }, [route]);

  return (
    <View style={styles.navigation}>
      <TouchableOpacity style={styles.navItem} onPress={goToHome}>
        <Home />
        <Text style={home ? styles.selectedNavText : styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToDiscover}>
        <Image
          source={require("../assets/images/discover.png")}
          style={discover ? styles.selectedNavImage : styles.navImage}
        />
        <Text style={discover ? styles.selectedNavText : styles.navText}>
          Discover
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToFavorites}>
        <Image
          source={require("../assets/images/favorites.png")}
          style={favorites ? styles.selectedNavImage : styles.navImage}
        />
        <Text style={favorites ? styles.selectedNavText : styles.navText}>
          Favorites
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToAccount}>
        <Image
          source={require("../assets/images/account.png")}
          style={account ? styles.selectedNavImage : styles.navImage}
        />
        <Text style={account ? styles.selectedNavText : styles.navText}>
          Account
        </Text>
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
  selectedNavImage: {
    width: "100%",
    height: "55%",
    resizeMode: "contain",
    marginBottom: "8%",
    color: "  #70e000",
  },
  navText: {
    fontWeight: "500",
  },
  selectedNavText: {
    fontWeight: "500",
    color: "#70e000",
  },
});
