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

export default function DaftarWisata() {
  const router = useRouter();
  const [dataDaftarWisata, setDataDaftarWisata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from("daftarwisata")
        .select("region, image, namawisata, id");
      if (error) {
        console.error("Error fetching data dari Supabase:", error);
      } else {
        const groupedData = data.reduce((acc: any, item) => {
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

  function handlePress(id: number) {
    router.push(`/detail-wisata?id=${id}`);
  }

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
        {dataDaftarWisata.map((regionObj, index) => (
          <View
            key={index}
            style={{
              marginBottom: 24,
            }}
          >
            {/* Nama Kabupaten */}
            <Text
              style={[
                FontStyles.quicksandHeader2Page,
                { marginBottom: 8, color: Colors.PRIMARY },
              ]}
            >
              {regionObj.region}
            </Text>

            {/* List Wisata */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap", // Untuk memungkinkan kartu membuat baris baru
                justifyContent: "space-between", // Memberi ruang antara kartu
                gap: 16,
              }}
            >
              {regionObj.wisata.map((tempat: any, tempatIndex: number) => (
                <TouchableWithoutFeedback
                  key={tempatIndex}
                  onPress={() => handlePress(tempat.id)} // Navigasi ke halaman detail
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
                    {/* Gambar Tempat */}
                    <Image
                      source={
                        typeof tempat.image === "string" &&
                        tempat.image.trim() !== ""
                          ? { uri: tempat.image }
                          : require("@/assets/images/tourism/1.pantaikuta.jpg") // Gambar default jika image tidak valid
                      }
                      style={{
                        width: "100%",
                        height: 152,
                        borderRadius: 8,
                      }}
                    />

                    {/* Detail Tempat */}
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
