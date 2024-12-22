import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";

export default function DaftarWisata({ searchField }) {
  const [dataDaftarWisata, setDataDaftarWisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from("daftarwisata")
        .select("region, image, namawisata, id");

      if (error) {
        console.error("Error fetching data dari Supabase:", error);
      } else {
        const groupedData = data.reduce((acc, item) => {
          const { region, ...rest } = item;
          if (acc[region]) {
            acc[region].push(rest);
          } else {
            acc[region] = [rest];
          }
          return acc;
        }, {});

        const formattedData = Object.entries(groupedData).map(
          ([region, wisata]) => ({
            region,
            wisata,
          })
        );
        setDataDaftarWisata(formattedData);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const filteredData = dataDaftarWisata
    .map((regionObj) => ({
      ...regionObj,
      wisata: regionObj.wisata.filter((tempat) =>
        tempat.namawisata.toLowerCase().includes(searchField.toLowerCase())
      ),
    }))
    .filter((regionObj) => regionObj.wisata.length > 0);

  if (loading) {
    return (
      <View style={{ marginVertical: 24 }}>
        <Text style={FontStyles.quicksand14Desc}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ marginVertical: 24 }}>
      <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 16 }]}>
        Daftar Wisata
      </Text>
      <View style={{ display: "flex", gap: 16 }}>
        {filteredData.map((regionObj, index) => (
          <View key={index} style={{ marginBottom: 24 }}>
            <Text
              style={[
                FontStyles.quicksandHeader2Page,
                { marginBottom: 8, color: Colors.PRIMARY },
              ]}
            >
              {regionObj.region}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              {regionObj.wisata.map((tempat, tempatIndex) => (
                <TouchableWithoutFeedback
                  key={tempatIndex}
                  onPress={() => router.push(`/detail-wisata?id=${tempat.id}`)}
                >
                  <View
                    style={{
                      backgroundColor: Colors.PRIMARYLighter,
                      padding: 12,
                      borderRadius: 8,
                      width: "47%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Image
                      source={
                        typeof tempat.image === "string" &&
                        tempat.image.trim() !== ""
                          ? { uri: tempat.image }
                          : require("@/assets/images/tourism/1.pantaikuta.jpg")
                      }
                      style={{
                        width: "100%",
                        height: 152,
                        borderRadius: 8,
                      }}
                    />
                    <Text
                      style={[
                        FontStyles.quicksandRegular,
                        {
                          marginBottom: 4,
                          color: Colors.PRIMARY,
                          alignSelf: "center",
                          textAlign: "center",
                        },
                      ]}
                    >
                      {tempat.namawisata}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
