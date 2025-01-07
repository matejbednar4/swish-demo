import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Home, Discover, Favorites, Account } from "./Svg";
import { currentRoute, getCurrentRoute, emptyRoute } from "./global/global";
import { colors } from "@/constants/Colors";

interface NavProps {
  route: any;
  navigation: any;
}

export default function BottomNavigation({ route, navigation }: NavProps) {
  const [currentRoute, setCurrentRoute] = useState<currentRoute>(emptyRoute);
  const goToPage = {
    home: () => {
      navigation.navigate("Home");
    },
    discover: () => {
      navigation.navigate("Discover");
    },
    favorites: () => {
      navigation.navigate("Favorites");
    },
    account: () => {
      navigation.navigate("Account");
    },
    settings: () => {
      navigation.navigate("Settings");
    },
  };

  const setRoute = () => {
    setCurrentRoute(getCurrentRoute(route));
  };

  useEffect(() => {
    setRoute();
  }, [route]);

  return (
    <View style={styles.navigation}>
      <TouchableOpacity style={styles.navItem} onPress={goToPage.home}>
        <Home
          fill={currentRoute.home ? colors.green : colors.black}
          style={styles.navImage}
        />
        <Text
          style={currentRoute.home ? styles.selectedNavText : styles.navText}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToPage.discover}>
        <Discover
          fill={currentRoute.discover ? colors.green : colors.black}
          style={styles.navImage}
        />
        <Text
          style={
            currentRoute.discover ? styles.selectedNavText : styles.navText
          }
        >
          Discover
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToPage.favorites}>
        <Favorites
          fill={currentRoute.favorites ? colors.green : colors.black}
          style={styles.navImage}
        />
        <Text
          style={
            currentRoute.favorites ? styles.selectedNavText : styles.navText
          }
        >
          Favorites
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={goToPage.account}>
        <Account
          fill={currentRoute.account ? colors.green : colors.black}
          style={styles.navImage}
        />
        <Text
          style={currentRoute.account ? styles.selectedNavText : styles.navText}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    height: "8%",
    paddingTop: "2%",
    flexDirection: "row",
    backgroundColor: colors.darkerBackground,
    position: "fixed",
    borderTopWidth: 0.5,
    borderColor: colors.grayOutline,
    paddingHorizontal: "6%",
    alignItems: "center",
    gap: "1%",
  },

  navItem: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  navImage: {
    flex: 1,
    width: "100%",
    height: "50%",
    marginBottom: "5%",
  },

  navText: {
    fontWeight: "500",
    color: colors.black,
  },

  selectedNavText: {
    fontWeight: "700",
    color: colors.green,
  },
});
