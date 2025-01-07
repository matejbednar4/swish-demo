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
import { BusinessName, BusinessType, LocationPin } from "@/components/Svg";
import { colors } from "@/constants/Colors";

export default function Home({ navigation }: { navigation: any }) {
  const goToDiscover = () => {
    navigation.navigate("Discover");
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopMenu navigation={navigation} /> */}
        <ScrollView
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={styles.scrollView}
        >
          <TouchableOpacity style={styles.findMeAplace} onPress={goToDiscover}>
            <Text style={{ fontWeight: "bold", color: colors.background }}>
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
          <BusinessName
            style={searchStyles.icon}
            height={"120%"}
            fill={colors.black}
          />
          <TextInput
            placeholder="Business name"
            placeholderTextColor={colors.placeholder}
            style={searchStyles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <View style={[searchStyles.field, { borderBottomWidth: 1 }]}>
          <LocationPin
            style={searchStyles.icon}
            height={"130%"}
            fill={colors.black}
          />
          <TextInput
            placeholder="Location"
            placeholderTextColor={colors.placeholder}
            style={searchStyles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <View style={searchStyles.field}>
          <BusinessType
            style={searchStyles.icon}
            height={"150%"}
            fill={colors.black}
          />
          <TextInput
            placeholder="Business Type"
            placeholderTextColor={colors.placeholder}
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
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: "2.5%",
    marginBottom: "8%",
  },
});

const searchStyles = StyleSheet.create({
  box: {
    backgroundColor: colors.darkerBackground,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: colors.grayOutline,
    paddingHorizontal: "4%",
    justifyContent: "center",
  },

  field: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.grayOutline,
    paddingVertical: "5.5%",
  },

  icon: {
    width: "10%",
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
    backgroundColor: colors.green,
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
    color: colors.black,
  },

  button: {
    fontWeight: "bold",
    color: colors.background,
  },
});
