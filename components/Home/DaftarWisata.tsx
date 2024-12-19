import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

export default function DaftarWisata() {
  const daftarWisata = [
    {
      kabupaten: "Badung",
      wisata: [
        {
          image: require("../../assets/images/tourism/1.pantaikuta.jpg"),
          namatempat: "Pantai Kuta",
          detail: "lorem ipsum dolor sit amet",
        },
        {
          image: require("../../assets/images/tourism/2.pantaipandawa.jpg"),
          namatempat: "Pantai Pandawa",
          detail: "lorem ipsum dolor sit amet",
        },
      ],
    },
    {
      kabupaten: "Denpasar",
      wisata: [
        {
          image: require("../../assets/images/tourism/3.bajrasandhi.jpg"),
          namatempat: "Bajra Sandhi",
          detail: "lorem ipsum dolor sit amet",
        },
        {
          image: require("../../assets/images/tourism/4.artcenter.jpg"),
          namatempat: "Art Center",
          detail: "lorem ipsum dolor sit amet",
        },
      ],
    },
    {
      kabupaten: "Gianyar",
      wisata: [
        {
          image: require("../../assets/images/tourism/5.tirtaempul.jpg"),
          namatempat: "Tirta Empul",
          detail: "lorem ipsum dolor sit amet",
        },
        {
          image: require("../../assets/images/tourism/6.monkeyforest.jpg"),
          namatempat: "Monkey Forest Ubud",
          detail: "lorem ipsum dolor sit amet",
        },
      ],
    },
    {
      kabupaten: "Tabanan",
      wisata: [
        {
          image: require("../../assets/images/tourism/7.tanahlot.jpg"),
          namatempat: "Tanah Lot",
          detail: "lorem ipsum dolor sit amet",
        },
        {
          image: require("../../assets/images/tourism/8.beratan.jpg"),
          namatempat: "Ulundanu Beratan",
          detail: "lorem ipsum dolor sit amet",
        },
      ],
    },
    {
      kabupaten: "Buleleng",
      wisata: [
        {
          image: require("../../assets/images/tourism/9.lovina.jpg"),
          namatempat: "Pantai Lovina",
          detail: "lorem ipsum dolor sit amet",
        },
        {
          image: require("../../assets/images/tourism/10.airterjunambengan.jpg"),
          namatempat: "Ambengan Waterfall",
          detail: "lorem ipsum dolor sit amet",
        },
      ],
    },
  ];
  return (
    <View style={{ marginVertical: 24 }}>
      <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 16 }]}>
        Daftar Wisata
      </Text>
      <View style={{ display: "flex", gap: 16 }}>
        {daftarWisata.map((kabupatenObj, index) => (
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
              {kabupatenObj.kabupaten}
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
              {kabupatenObj.wisata.map((tempat, tempatIndex) => (
                <View
                  key={tempatIndex}
                  style={{
                    backgroundColor: Colors.PRIMARYLighter,
                    padding: 12,
                    borderRadius: 8,
                    width: "48%", // Lebar setiap kartu agar muat 2 dalam satu baris
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {/* Gambar Tempat */}
                  <Image
                    source={tempat.image}
                    style={{
                      width: "100%",
                      height: 152,
                      borderRadius: 8,
                    }}
                  />

                  {/* Detail Tempat */}
                  <Text
                    style={[
                      FontStyles.quicksandHeader2Page,
                      { marginBottom: 4, color: Colors.PRIMARY },
                    ]}
                  >
                    {tempat.namatempat}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
