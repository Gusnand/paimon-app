import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontStyles } from "@/constants/Fonts";
import Header from "@/components/Layout/Header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import WisataTerpopuler from "@/components/Home/WisataTerpopuler";
import DaftarWisata from "@/components/Home/DaftarWisata";
import { supabase } from "@/utils/supabase";

export default function Home() {
  const [searchSelected, setSearchSelected] = useState(false);
  const [searchField, setSearchField] = useState("");

  return (
    <ScrollView
      style={{ flex: 1, margin: 24 }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Header headerText="Home" />
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
          borderWidth: searchSelected ? 2 : 0,
          borderColor: Colors.PRIMARY,
          borderStyle: "solid",
        }}
      >
        <MaterialIcons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          onFocus={() => setSearchSelected(true)}
          onBlur={() => setSearchSelected(false)}
          placeholder="Cari destinasi wisata..."
          style={[FontStyles.quicksand14Color, { width: "100%" }]}
          value={searchField}
          onChangeText={(text) => setSearchField(text)}
        />
      </View>

      {/* Statistik */}
      <WisataTerpopuler searchField={searchField} />

      {/* Daftar Wisata */}
      <DaftarWisata searchField={searchField} />
    </ScrollView>
  );
}
