import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

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
});
