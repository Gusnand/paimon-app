import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Quicksand_400Regular } from "@expo-google-fonts/quicksand";

export const FontStyles = StyleSheet.create({
  quicksand: {
    fontSize: 20,
    fontFamily: "Quicksand_300Light",
  },
  quicksandTitle: {
    fontSize: 28,
    fontFamily: "Quicksand_700Bold",
    textAlign: "center",
    color: Colors.PRIMARY,
  },
  quicksandHeaderPage: {
    fontSize: 22,
    fontFamily: "Quicksand_700Bold",
    textAlign: "left",
    color: Colors.PRIMARY,
  },
  quicksandHeader2Page: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
    color: Colors.PRIMARY,
  },
  quicksand14Desc: {
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
    color: "#8C8C8C",
  },
  quicksand14: {
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
    color: "#3C3C3C",
  },
  quicksand14Color: {
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
    color: Colors.PRIMARY,
  },
  quicksandButtonPrimary: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  quicksandButtonSecondary: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
    textAlign: "center",
    color: Colors.PRIMARY,
  },

  //just quicksand
  quicksandLight: {
    fontFamily: "Quicksand_300Light",
  },
  quicksandRegular: {
    fontFamily: "Quicksand_400Regular",
  },
  quicksandMedium: {
    fontFamily: "Quicksand_500Medium",
  },
  quicksandSemiBold: {
    fontFamily: "Quicksand_600SemiBold",
  },
  quicksandBold: {
    fontFamily: "Quicksand_700Bold",
  },
});
