import { View, Text } from "react-native";
import React from "react";
import { FontStyles } from "@/constants/Fonts";

export default function Header() {
  return (
    <View>
      <Text style={FontStyles.quicksandHeaderPage}>Header</Text>
    </View>
  );
}
