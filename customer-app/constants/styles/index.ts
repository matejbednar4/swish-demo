import { StyleSheet } from "react-native";
import { colors } from "../Colors";

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "10%",
    alignItems: "center",
  },

  heading: {
    position: "absolute",
    fontWeight: "700",
    fontSize: 70,
    color: colors.background,
    paddingBottom: "1.5%",
  },

  motto: {
    color: colors.background,
    fontWeight: "400",
  },

  buttons: {
    width: "66%",
    flex: 1.3,
    justifyContent: "flex-start",
    gap: "10",
  },

  loginButton: {
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.background,
  },

  loginText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },

  registerButton: {
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colors.background,
    borderWidth: 2,
  },

  registerText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.background,
  },
});