import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 24,
        }}
      >
        <Image
          source={require("./../assets/images/paimon.gif")}
          style={{
            width: 300,
            height: 300,
          }}
        />
        <Text style={[FontStyles.quicksandTitle, { marginBottom: 4 }]}>
          Selamat Datang di
          <br />
          Paimon!
        </Text>
        <Text style={[FontStyles.quicksand14Desc, { textAlign: "center" }]}>
          Your reliable travel companion
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          display: "flex",
          bottom: 24,
          width: "100%",
          paddingHorizontal: 24,
          gap: 12,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Link href="/sign-in" style={{ textAlign: "center" }}>
            <Text style={FontStyles.quicksandButtonPrimary}>Masuk</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 12,
            borderColor: Colors.PRIMARY,
            borderWidth: 2,
            borderStyle: "solid",
          }}
        >
          <Link href="/sign-up" style={{ textAlign: "center" }}>
            <Text style={FontStyles.quicksandButtonSecondary}>Bergabung</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
