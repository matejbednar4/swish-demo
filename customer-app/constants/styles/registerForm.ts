import { StyleSheet } from "react-native";
import { colors } from "../Colors";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    marginTop: "30%",
    justifyContent: "flex-end",
  },

  heading: {
    fontSize: 45,
    fontWeight: "600",
    color: colors.green,
  },

  buttons: {
    marginTop: "10%",
    marginBottom: "5%",
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "5%",
  },

  selectedButton: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.green,
  },

  unselectedButton: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colors.grayOutline,
    borderWidth: 1,
  },

  selectedText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.background,
  },

  unselectedText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.black,
  },

  formContainer: {
    width: "80%",
    height: "100%",
  },

  formHeader: {
    position: "fixed",
    marginBottom: "8%",
    paddingHorizontal: "5%",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },

  form: {
    position: "fixed",
    alignItems: "center",
    backgroundColor: colors.darkerBackground,
    borderRadius: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: "5%",
    borderColor: colors.grayOutline,
    borderWidth: 1,
  },

  formHeading: {
    fontWeight: "500",
    fontSize: 18,
    color: colors.black,
  },

  formFields: {
    width: "90%",
    flexDirection: "column",
    gap: 16,
  },

  formField: {
    gap: 4,
  },

  fieldInput: {
    padding: 4,
    paddingLeft: 8,
    height: 32,
    borderRadius: 6,
    borderColor: colors.grayOutline,
    borderWidth: 1,
    backgroundColor: colors.background,
  },

  formButton: {
    backgroundColor: colors.green,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
  },

  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "8%",
  },

  field: {
    flex: 1,
    gap: 4,
  },

  pfpForm: {
    position: "fixed",
    alignItems: "center",
    backgroundColor: colors.darkerBackground,
    borderRadius: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: "5%",
    borderColor: colors.grayOutline,
    borderWidth: 1,
    aspectRatio: 1,
  },

  pfpFormHeader: {
    flex: 1,
    position: "fixed",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },

  pfpFormMiddle: {
    flex: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  pfpFormBottom: {
    flex: 1,
  },

  pfpFormPfp: {
    height: "70%",
    aspectRatio: 1,
    backgroundColor: colors.background,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: colors.grayOutline,
    justifyContent: "center",
    alignItems: "center",
  },

  pfp: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: "50%",
  },

  addPfp: {
    color: colors.placeholder,
    fontWeight: "500",
  },
});
