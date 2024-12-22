import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/utils/supabase"; // Pastikan path ke Supabase sesuai
import { router, useRouter } from "expo-router";

export default function WisataTerpopuler() {
  const [popularWisata, setPopularWisata] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchPopularWisata = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("daftarwisata")
          .select("id, namawisata, region, like")
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

  if (!popularWisata.length) {
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

  function handlePress(id: number) {
    router.push(`/detail-wisata?id=${id}`);
  }

  return (
    <View style={{ marginVertical: 24 }}>
      <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 16 }]}>
        Wisata Terpopuler
      </Text>
      <View style={{ display: "flex", gap: 16 }}>
        {popularWisata.map((wisata, wisataIndex: number) => (
          <TouchableOpacity
            key={wisataIndex}
            onPress={() => handlePress(wisata.id)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 24,
              backgroundColor: Colors.PRIMARYLighter,
              borderRadius: 12,
              display: "flex",
              gap: 2,
            }}
          >
            <Text style={[FontStyles.quicksandBold, { fontSize: 24 }]}>
              {wisata.namawisata}
            </Text>
            <Text style={[FontStyles.quicksandBold, { fontSize: 14 }]}>
              {wisata.region}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
