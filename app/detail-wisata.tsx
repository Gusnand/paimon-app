import { Colors } from "@/constants/Colors";
import { FontStyles } from "@/constants/Fonts";
import { supabase } from "@/utils/supabase";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RegionIcon from "@/assets/icons/regionIcon.svg";
import LikesIcon from "@/assets/icons/likesIcon.svg";
import ViewsIcon from "@/assets/icons/viewsIcon.svg";

export default function DetailWisata() {
  const { id } = useLocalSearchParams(); // Ambil ID dari parameter URL
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Jika ID tidak ada, jangan fetch data
    fetchDetailWisata();
  }, [id]);

  async function fetchDetailWisata() {
    const { data, error } = await supabase
      .from("daftarwisata")
      .select("id, namawisata, image, detail, region, view, alamat")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching data:", error);
      return router.replace("/home"); // Redirect jika error
    }

    setData(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <View style={{ paddingTop: 8, paddingBottom: 8, paddingHorizontal: 12 }}>
        <Text style={[FontStyles.quicksandHeaderPage, { marginBottom: 16 }]}>
          {data.namawisata}
        </Text>
        <Image
          source={{ uri: data.image }}
          style={{
            width: "100%",
            height: 170,
            borderRadius: 8,
            marginBottom: 12,
          }}
        ></Image>
        <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 8 }]}>
          Overview
        </Text>
        <View
          style={{
            padding: 12,
            borderRadius: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <View style={{ alignItems: "center", width: "33%" }}>
            <RegionIcon style={{ marginBottom: 8 }} />
            <Text style={[FontStyles.quicksandMedium, { marginBottom: 2 }]}>
              Region
            </Text>
            <Text style={[FontStyles.quicksandBold, { color: Colors.PRIMARY }]}>
              {data.region}
            </Text>
          </View>
          <View style={{ alignItems: "center", width: "33%" }}>
            <ViewsIcon style={{ marginBottom: 8 }} />
            <Text style={[FontStyles.quicksandMedium, { marginBottom: 2 }]}>
              Dilihat
            </Text>
            <Text style={[FontStyles.quicksandBold, { color: Colors.PRIMARY }]}>
              {data.view}
            </Text>
          </View>
          <View style={{ alignItems: "center", width: "33%" }}>
            <LikesIcon style={{ marginBottom: 8 }} />
            <Text style={[FontStyles.quicksandMedium, { marginBottom: 2 }]}>
              Disukai
            </Text>
            <Text style={[FontStyles.quicksandBold, { color: Colors.PRIMARY }]}>
              {data.likes}
            </Text>
          </View>
        </View>

        <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 8 }]}>
          Alamat
        </Text>
        <Text style={[FontStyles.quicksandMedium, { marginBottom: 12 }]}>
          {data.alamat}
        </Text>
        <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 8 }]}>
          Tentang
        </Text>
        <Text
          style={[
            FontStyles.quicksandMedium,
            { textAlign: "justify", marginBottom: 8 },
          ]}
        >
          {data.detail}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  region: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "justify",
  },
  alamat: {
    fontSize: 14,
    color: "#555",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
