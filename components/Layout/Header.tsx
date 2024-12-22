import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontStyles } from "@/constants/Fonts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

interface HeaderProps {
  headerText: string;
  withBackButton?: boolean;
  linkHref?: any; // Disesuaikan agar lebih spesifik
}

export default function Header({
  headerText,
  linkHref = "/home", // Nilai default jika `linkHref` tidak diberikan
  withBackButton,
}: HeaderProps) {
  const router = useRouter(); // Menggunakan useRouter untuk navigasi

  return (
    <View style={{ marginBottom: 8 }}>
      <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
        {withBackButton && (
          <TouchableOpacity
            onPress={() => router.push(linkHref)} // Navigasi menggunakan router.push
            style={{
              backgroundColor: "white",
              borderRadius: 4,
              elevation: 5, // Untuk Android
              shadowColor: "black", // Untuk iOS dan Android
              shadowOffset: { width: 0, height: 2 }, // Untuk iOS dan Android
              shadowOpacity: 0.07, // Untuk iOS dan Android
              shadowRadius: 15, // Untuk iOS dan Android
            }}
          >
            <MaterialIcons
              name="chevron-left"
              size={28}
              color={Colors.PRIMARY}
            />
          </TouchableOpacity>
        )}

        <Text style={FontStyles.quicksandHeaderPage}>{headerText}</Text>
      </View>
    </View>
  );
}
