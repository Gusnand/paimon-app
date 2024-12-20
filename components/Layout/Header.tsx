import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontStyles } from "@/constants/Fonts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

interface HeaderProps {
  headerText: string;
  withBackButton?: boolean;
  linkHref?: any;
}

export default function Header({
  headerText,
  linkHref,
  withBackButton,
}: HeaderProps) {
  return (
    <View style={{ marginBottom: 8 }}>
      <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
        {withBackButton && (
          <Link href={{ pathname: linkHref ? linkHref : "/home" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 4,
                elevation: 5, // For Android
                shadowColor: "black", // For iOS and Android
                shadowOffset: { width: 0, height: 2 }, // For iOS and Android
                shadowOpacity: 0.07, // For iOS and Android
                shadowRadius: 15, // For iOS and Android
              }}
            >
              <MaterialIcons
                name="chevron-left"
                size={28}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
          </Link>
        )}

        <Text style={FontStyles.quicksandHeaderPage}>{headerText}</Text>
      </View>
    </View>
  );
}
