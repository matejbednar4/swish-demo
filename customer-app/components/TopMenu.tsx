import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as customerSdk from "../../shared/sdk/src/routes/customer";
import { useRoute } from "@react-navigation/native";
import { loadCustomer, useCustomer } from "./CustomerContext";
import {
  currentRoute,
  emptyRoute,
  getCurrentRoute,
} from "@/components/global/global";
import { useNavigation } from "expo-router";
import { colors } from "@/constants/Colors";
import { Account, AccountSettings } from "./Svg";

interface PageMenuProps {
  customer: customerSdk.Customer;
  goToPage: {
    home: () => void;
    discover: () => void;
    favorites: () => void;
    account: () => void;
    settings: () => void;
  };
}

interface AccountMenuProps {
  customer: customerSdk.Customer;
  goToPage: {
    home: () => void;
    discover: () => void;
    favorites: () => void;
    account: () => void;
    settings: () => void;
  };
  currentRoute: currentRoute;
}

export default function TopMenu({ onBack }: { onBack?: () => void }) {
  const navigation: any = useNavigation();
  const route = useRoute();
  const { customer } = useCustomer() as any;
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
    <View>
      {currentRoute.home && (
        <HomeMenu goToPage={goToPage} customer={customer} />
      )}
      {currentRoute.discover && (
        <DiscoverMenu goToPage={goToPage} customer={customer} />
      )}
      {currentRoute.favorites && (
        <FavoritesMenu goToPage={goToPage} customer={customer} />
      )}
      {currentRoute.account && (
        <AccountMenu
          currentRoute={currentRoute}
          goToPage={goToPage}
          customer={customer}
        />
      )}
      {currentRoute.settings && (
        <AccountMenu
          currentRoute={currentRoute}
          goToPage={goToPage}
          customer={customer}
        />
      )}
    </View>
  );
}

const HomeMenu = ({ goToPage, customer }: PageMenuProps) => {
  return (
    <View style={styles.main}>
      <View style={styles.menu}>
        <TouchableOpacity
          style={{ height: "100%", width: "20%", justifyContent: "center" }}
        >
          <Text style={textStyles.selectedHeading}>Swish</Text>
        </TouchableOpacity>
        <View style={styles.rightSide}>
          <TouchableOpacity style={styles.pfp} onPress={goToPage.account}>
            <ProfilePic customer={customer} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DiscoverMenu = ({ goToPage, customer }: PageMenuProps) => {
  return (
    <View style={styles.main}>
      <View style={styles.menu}>
        <TouchableOpacity
          style={{ height: "100%", width: "20%", justifyContent: "center" }}
        >
          <Text style={textStyles.heading}>Swish</Text>
        </TouchableOpacity>
        <View style={styles.rightSide}>
          <TouchableOpacity style={styles.pfp} onPress={goToPage.account}>
            <ProfilePic customer={customer} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FavoritesMenu = ({ goToPage, customer }: PageMenuProps) => {
  return (
    <View style={styles.main}>
      <View style={styles.menu}>
        <TouchableOpacity
          style={{ height: "100%", width: "20%", justifyContent: "center" }}
        >
          <Text style={textStyles.heading}>Swish</Text>
        </TouchableOpacity>
        <View style={styles.rightSide}>
          <TouchableOpacity style={styles.pfp} onPress={goToPage.account}>
            <ProfilePic customer={customer} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AccountMenu = ({
  goToPage,
  currentRoute,
  customer,
}: AccountMenuProps) => {
  return (
    <View style={styles.accountMain}>
      <View style={styles.accountLeftSide}></View>
      <View style={styles.accountMiddle}>
        <View style={styles.accountPfp}>
          <ProfilePic customer={customer} />
        </View>
      </View>
      <View style={styles.accountRightSide}>
        <TouchableOpacity onPress={goToPage.settings}>
          <AccountSettings
            style={styles.accountSettingsIcon}
            fill={currentRoute.settings ? colors.green : colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfilePic = ({ customer }: { customer: customerSdk.Customer }) => {
  const uri = customer?.pfp?.url;

  if (uri) {
    return (
      <Image
        source={{ uri, cache: "force-cache" }}
        style={{ height: "100%", aspectRatio: 1, borderRadius: "50%" }}
      />
    );
  }

  if (!uri) {
    return (
      <View>
        <Account
          style={{ width: "50%", aspectRatio: 1 }}
          fill={colors.placeholder}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    height: 60,
    backgroundColor: colors.darkerBackground,
    borderBottomWidth: 0.5,
    paddingVertical: "2%",
    paddingHorizontal: "6%",
    borderColor: colors.grayOutline,
  },

  menu: {
    height: "100%",
    width: "100%",
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
    backgroundColor: colors.background,
    borderColor: colors.grayOutline,
    borderWidth: 0.5,
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
  },

  accountMain: {
    height: 90,
    backgroundColor: colors.darkerBackground,
    borderBottomWidth: 0.5,
    paddingVertical: "2%",
    paddingHorizontal: "6%",
    borderColor: colors.grayOutline,
    flexDirection: "row",
  },

  accountLeftSide: {
    flex: 1,
  },

  accountMiddle: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  accountMenu: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  accountPfp: {
    height: "85%",
    backgroundColor: colors.background,
    borderColor: colors.grayOutline,
    borderWidth: 0.5,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
  },

  accountName: {
    marginLeft: "5%",
  },

  accountRightSide: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  accountSettingsIcon: {
    width: "23%",
    aspectRatio: 1,
  },

  settingsLeft: {
    flex: 1,
  },

  settingsMiddle: {
    flex: 1,
    alignItems: "center",
  },

  settingsRight: { flex: 1 },
});

const textStyles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.black,
  },

  selectedHeading: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.green,
  },

  accountFirstName: {
    color: colors.black,
    fontWeight: "600",
    fontSize: 16,
  },

  accountLastName: {
    color: colors.black,
    fontWeight: "400",
    fontSize: 14,
  },
});
