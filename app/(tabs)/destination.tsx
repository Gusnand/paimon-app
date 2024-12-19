import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Layout/Header";
import MapView from "react-native-maps";

export default function destination() {
  return (
    <View style={{ flex: 1, margin: 24 }}>
      {/* header */}
      <Header headerText="Wisata" />
      <View style={{ flex: 1 }}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
}
