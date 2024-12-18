import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontStyles } from "@/constants/Fonts";
import Header from "@/components/Layout/Header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";

export default function home() {
  const [searchSelected, setSearchSelected] = useState(false);
  const [searchField, setSearchField] = useState("");

  return (
    <View style={{ margin: 24 }}>
      {/* header */}
      <Header />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
          backgroundColor: Colors.PRIMARYLighter,
          padding: searchSelected ? 8 : 10,
          marginVertical: 10,
          marginTop: 16,
          borderRadius: 12,
          borderWidth: searchSelected ? 2 : 0, // Conditional borderWidth
          borderColor: Colors.PRIMARY,
          borderStyle: "solid",
        }}
      >
        <MaterialIcons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          onFocus={() => {
            setSearchSelected(true);
          }}
          onBlur={() => setSearchSelected(false)}
          placeholder="Cari destinasi wisata..."
          style={[FontStyles.quicksand14Color, { width: "100%" }]}
          value={searchField}
          onChangeText={(text) => setSearchField(text)}
        />
      </View>

      {/* statistik */}
      <View style={{ marginVertical: 24 }}>
        <Text style={[FontStyles.quicksandHeader2Page, { marginBottom: 16 }]}>
          Wisata Terpopuler
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
        </View>
      </View>
      {/* daftar wisata */}
    </View>
  );
}
