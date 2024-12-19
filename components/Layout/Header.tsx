import { View, Text } from "react-native";
import React from "react";
import { FontStyles } from "@/constants/Fonts";

interface HeaderProps {
  headerText: string;
}

export default function Header({ headerText }: HeaderProps) {
  return (
    <View>
      <Text style={FontStyles.quicksandHeaderPage}>{headerText}</Text>
    </View>
  );
}
