import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as sdk from "../../sdk/src/routes/customer";

interface Customer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  score: number;
  createdAt: Date;
}

const emptyCustomer: Customer = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  score: 0,
  createdAt: new Date(),
};

export default function TopMenu({ uid }: { uid: string }) {
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);

  const fetchCustomer = async () => {
    const response = await sdk.getCustomerById(Number(uid));

    if ("error" in response) {
      console.error("Failed to fetch customer");
      return;
    }

    if (response.status === 200) {
      setCustomer(response.json);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <View style={styles.topMenu}>
      <Text style={textStyles.heading}>Swish</Text>
      <View style={styles.rightSide}>
        <View style={styles.pfp}>
          <Text>{customer.firstName}</Text>
        </View>
      </View>
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

  rightSide: {
    height: "80%",
    width: "83%",
    alignSelf: "center",
    alignItems: "flex-end",
  },

  pfp: {
    backgroundColor: "lightgray",
    height: "100%",
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
  },
});

const textStyles = StyleSheet.create({
  heading: { fontWeight: "bold", fontSize: 20 },
});
