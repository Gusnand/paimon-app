import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function LoginScreen() {
  const onSignUp = async () => {
    const url = "/sign-up";
    await Linking.openURL(url);
  };

  const onSignIn = async () => {
    const url = "/sign-in";
    await Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          display: "flex",
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
          onPress={() => {
            onSignIn;
          }}
          style={{
            backgroundColor: Colors.PRIMARY,
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Link href="/sign-in">
            <Text style={FontStyles.quicksandButtonPrimary}>Masuk</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onSignUp;
          }}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 12,
            borderColor: Colors.PRIMARY,
            borderWidth: 2,
            borderStyle: "solid",
          }}
        >
          <Text style={FontStyles.quicksandButtonSecondary}>Bergabung</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
