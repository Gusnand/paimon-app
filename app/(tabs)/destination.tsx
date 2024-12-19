import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Layout/Header";

export default function destination() {
  return (
    <View style={{ flex: 1, margin: 24 }}>
      {/* header */}
      <Header headerText="Wisata" />
    </View>
  );
}
