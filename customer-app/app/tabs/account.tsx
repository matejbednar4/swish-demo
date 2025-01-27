import { useCustomer } from "@/components/CustomerContext";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AccountStatisticsPin,
  AccountStatisticsDollar,
  AccountStatisticsArrow,
  AccountStatisticsPicture,
} from "@/components/Svg";
import { colors } from "@/constants/Colors";

export default function Account() {
  const { customer, setCustomer } = useCustomer();
  return (
    <ScrollView
      contentContainerStyle={styles.main}
      style={{ backgroundColor: colors.background }}
    >
      <Text
        style={textStyles.sectionHeading}
      >{`Welcome, ${customer?.fullName}`}</Text>
      <View style={styles.balanceWrapper}>
        <View style={styles.balanceBox}>
          <Text style={textStyles.balance}>${customer?.balance}</Text>
        </View>
        <TouchableOpacity style={styles.cashout}>
          <Text style={textStyles.cashout}>Cashout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", marginTop: "10%" }}>
        <Text style={textStyles.sectionHeading}>Your Statistics</Text>
        <View style={statisticStyles.box}>
          <View style={statisticStyles.row}>
            <View style={[statisticStyles.statistic, statisticStyles.s1]}>
              <AccountStatisticsPin
                style={{ position: "absolute", zIndex: 0 }}
              />
              <Text style={textStyles.statisticHeading}>Visited Places</Text>
              <Text style={textStyles.statistic}>
                {customer?.visitedPlaces}
              </Text>
            </View>
            <View style={statisticStyles.statistic}>
              <AccountStatisticsDollar
                style={{ position: "absolute", zIndex: 0 }}
              />
              <Text style={textStyles.statisticHeading}>Total Rewards</Text>
              <Text style={textStyles.statistic}>
                ${customer?.totalRewards}
              </Text>
            </View>
            <View style={[statisticStyles.statistic, statisticStyles.s3]}>
              <AccountStatisticsArrow
                style={{ position: "absolute", zIndex: 0 }}
              />
              <Text style={textStyles.statisticHeading}>Your Rating</Text>
              <Text style={textStyles.statistic}>{customer?.rating}%</Text>
            </View>
          </View>
          <View style={statisticStyles.row}>
            <View style={statisticStyles.s4}>
              <Text style={textStyles.statisticHeading}>Graph</Text>
              <Text style={textStyles.statistic}>graph</Text>
            </View>
            <View style={[statisticStyles.statistic, statisticStyles.s5]}>
              <AccountStatisticsPicture
                style={{ position: "absolute", zIndex: 0 }}
              />
              <Text style={textStyles.statisticHeading}>Sold Images</Text>
              <Text style={textStyles.statistic}>{customer?.soldImages}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    paddingHorizontal: "6%",
    paddingVertical: "8%",
  },

  balanceWrapper: {
    width: "100%",
    height: 140,
    gap: "5%",
  },

  balanceBox: {
    height: "70%",
    width: "100%",
    backgroundColor: colors.darkerBackground,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderColor: colors.grayOutline,
  },

  cashout: {
    height: "25%",
    width: "100%",
    borderRadius: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
});

const statisticStyles = StyleSheet.create({
  box: {
    width: "100%",
    gap: "3%",
  },

  row: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    gap: "2%",
  },

  statistic: {
    width: "32%",
    backgroundColor: colors.darkerBackground,
    borderWidth: 1,
    borderColor: colors.grayOutline,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
  },

  s1: {
    borderTopLeftRadius: 12,
  },

  s3: {
    borderTopRightRadius: 12,
  },

  s4: {
    width: "66%",
    backgroundColor: colors.darkerBackground,
    borderRadius: 4,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderColor: colors.grayOutline,
    justifyContent: "center",
    alignItems: "center",
  },

  s5: {
    borderBottomRightRadius: 12,
  },
});

const textStyles = StyleSheet.create({
  balance: {
    color: colors.green,
    fontWeight: "800",
    fontSize: 30,
  },

  cashout: {
    color: colors.background,
    fontWeight: "700",
  },

  sectionHeading: {
    alignSelf: "flex-start",
    marginBottom: "2%",
    fontWeight: "bold",
    color: colors.black,
  },

  statisticHeading: {
    fontWeight: "600",
    color: colors.black,
  },

  statistic: {
    fontWeight: "800",
    fontSize: 16,
    color: colors.green,
  },
});
