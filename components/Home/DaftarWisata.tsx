import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

export default function DaftarWisata() {
  return (
    <View style={{ marginVertical: 24 }}>
      <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 16 }]}>
        Daftar Wisata
      </Text>
      <View style={{ display: "flex", gap: 16 }}>
        <TouchableOpacity
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
            Jembatan Sakenan
          </Text>
          <Text style={[FontStyles.quicksandBold, { fontSize: 14 }]}>
            Denpasar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
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
            Dharmanegara Alaya
          </Text>
          <Text style={[FontStyles.quicksandBold, { fontSize: 14 }]}>
            Denpasar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
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
            Dharmanegara Alaya
          </Text>
          <Text style={[FontStyles.quicksandBold, { fontSize: 14 }]}>
            Denpasar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
