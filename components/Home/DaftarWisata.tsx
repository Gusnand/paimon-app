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
  // const daftarWisata = [
  //   {
  //     kabupaten: "Badung",
  //     wisata: [
  //       {
  //         id: 1,
  //         image: require("../../assets/images/tourism/1.pantaikuta.jpg"),
  //         namatempat: "Pantai Kuta",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //       {
  //         id: 2,
  //         image: require("../../assets/images/tourism/2.pantaipandawa.jpg"),
  //         namatempat: "Pantai Pandawa",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //     ],
  //   },
  //   {
  //     kabupaten: "Denpasar",
  //     wisata: [
  //       {
  //         id: 3,
  //         image: require("../../assets/images/tourism/3.bajrasandhi.jpg"),
  //         namatempat: "Bajra Sandhi",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //       {
  //         id: 4,
  //         image: require("../../assets/images/tourism/4.artcenter.jpg"),
  //         namatempat: "Art Center",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //     ],
  //   },
  //   {
  //     kabupaten: "Gianyar",
  //     wisata: [
  //       {
  //         id: 5,
  //         image: require("../../assets/images/tourism/5.tirtaempul.jpg"),
  //         namatempat: "Tirta Empul",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //       {
  //         id: 6,
  //         image: require("../../assets/images/tourism/6.monkeyforest.jpg"),
  //         namatempat: "Monkey Forest Ubud",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //     ],
  //   },
  //   {
  //     kabupaten: "Tabanan",
  //     wisata: [
  //       {
  //         id: 7,
  //         image: require("../../assets/images/tourism/7.tanahlot.jpg"),
  //         namatempat: "Tanah Lot",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //       {
  //         id: 8,
  //         image: require("../../assets/images/tourism/8.beratan.jpg"),
  //         namatempat: "Ulundanu Beratan",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //     ],
  //   },
  //   {
  //     kabupaten: "Buleleng",
  //     wisata: [
  //       {
  //         id: 9,
  //         image: require("../../assets/images/tourism/9.lovina.jpg"),
  //         namatempat: "Pantai Lovina",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //       {
  //         id: 10,
  //         image: require("../../assets/images/tourism/10.airterjunambengan.jpg"),
  //         namatempat: "Ambengan Waterfall",
  //         detail: "lorem ipsum dolor sit amet",
  //       },
  //     ],
  //   },
  // ];

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
