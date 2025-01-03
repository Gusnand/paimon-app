import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/utils/supabase"; // Pastikan path ke Supabase sesuai
import { router, useRouter } from "expo-router";

export default function WisataTerpopuler({ searchField = "" }) {
  const [popularWisata, setPopularWisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularWisata = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("daftarwisata")
          .select("id, namawisata, region, like, image")
          .order("like", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Error fetching popular wisata:", error);
          return;
        }

        setPopularWisata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularWisata();
  }, []);

  const filteredWisata = popularWisata.filter((wisata) =>
    wisata.namawisata.toLowerCase().includes(searchField.toLowerCase())
  );

  if (loading) {
    return (
      <View
        style={{
          marginVertical: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (!filteredWisata.length) {
    return (
      <View
        style={{
          marginVertical: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={FontStyles.quicksandBold}>
          Tidak ada data wisata terpopuler.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginVertical: 24 }}>
      <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 16 }]}>
        Wisata Terpopuler
      </Text>
      <View style={{ display: "flex", gap: 16 }}>
        {filteredWisata.map((wisata, wisataIndex) => (
          <TouchableOpacity
            key={wisataIndex}
            onPress={() => router.push(`/detail-wisata?id=${wisata.id}`)}
            style={{
              borderRadius: 12,
              overflow: "hidden", // Agar gambar tidak keluar dari batasan radius
            }}
          >
            <ImageBackground
              source={
                typeof wisata.image === "string" && wisata.image.trim() !== ""
                  ? { uri: wisata.image }
                  : require("@/assets/images/default-image.jpg")
              }
              style={{
                paddingHorizontal: 16,
                paddingVertical: 24,
                display: "flex",
                gap: 2,
                justifyContent: "center", // Memusatkan teks secara vertikal
              }}
              imageStyle={{
                borderRadius: 12, // Membuat gambar memiliki sudut melengkung
              }}
            >
              <Text
                style={[
                  FontStyles.quicksandBold,
                  {
                    fontSize: 24,
                    color: "white",
                    textShadowColor: "black",
                    textShadowRadius: 4,
                  },
                ]}
              >
                {wisata.namawisata}
              </Text>
              <Text
                style={[
                  FontStyles.quicksandBold,
                  {
                    fontSize: 14,
                    color: "white",
                    textShadowColor: "black",
                    textShadowRadius: 4,
                  },
                ]}
              >
                {wisata.region}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
