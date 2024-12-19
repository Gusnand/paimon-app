import { View, Text, TouchableOpacity, Image, Touchable } from "react-native";
import React from "react";
import { Link, Tabs } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Layout/Header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useUser } from "@clerk/clerk-expo";

const buttonSettings = [
  {
    name: "Kebijakan Privasi",
    url: "/profil",
    icon: "privacy-tip",
  },
  {
    name: "Persyaratan Layanan",
    url: "/profil",
    icon: "privacy-tip",
  },
];

export default function profile() {
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View style={{ display: "flex", margin: 24, gap: 24 }}>
      {/* Overview Section */}
      <View
        style={{
          display: "flex",
          gap: 12,
        }}
      >
        <Header headerText="Profil" />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../assets/images/paimon-kotak.jpg")}
            style={{
              width: 56,
              height: 56,
              borderRadius: 1000,
            }}
          />
          <View style={{ display: "flex", gap: 4 }}>
            <Text style={[FontStyles.quicksandBold, { fontSize: 18 }]}>
              {user?.firstName || "User12356"}
              <Text
                style={[
                  FontStyles.quicksandBold,
                  { color: Colors.PRIMARY, fontSize: 14, paddingLeft: 4 },
                ]}
              >
                ♀
              </Text>
            </Text>
            <Text
              style={[
                FontStyles.quicksandBold,
                { fontSize: 12, color: Colors.Gray },
              ]}
            >
              @{user?.username}
            </Text>
          </View>
        </View>
        <Text
          style={[
            FontStyles.quicksand14Desc,
            { color: Colors.light.text, lineHeight: 22 },
          ]}
        >
          Just a traveler addict. I want to see all the beauty of the world!
          Lorem ipsum dolor sit amet
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Link href="/home" style={{ textAlign: "center" }}>
            <Text style={FontStyles.quicksandButtonPrimary}>Atur Profil</Text>
          </Link>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View
        style={{
          display: "flex",
          gap: 16,
          marginVertical: 10,
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <MaterialIcons name="privacy-tip" size={28} color={Colors.PRIMARY} />
          <Text
            style={[
              FontStyles.quicksandBold,
              { fontSize: 14, color: Colors.PRIMARY },
            ]}
          >
            Kebijakan Privasi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <MaterialIcons name="text-snippet" size={28} color={Colors.PRIMARY} />
          <Text
            style={[
              FontStyles.quicksandBold,
              { fontSize: 14, color: Colors.PRIMARY },
            ]}
          >
            Persyaratan Layanan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <MaterialIcons name="logout" size={28} color={Colors.PRIMARY} />
          <Text
            style={[
              FontStyles.quicksandBold,
              { fontSize: 14, color: Colors.PRIMARY },
            ]}
          >
            Keluar
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 10,
          borderColor: Colors.PRIMARY,
          borderWidth: 2,
          borderStyle: "solid",
          marginVertical: 10,
          marginTop: 16,
        }}
      >
        <Text style={FontStyles.quicksandButtonSecondary}>Hapus Akun</Text>
      </TouchableOpacity>
    </View>
  );
}
