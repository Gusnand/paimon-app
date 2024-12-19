import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.PRIMARY,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Beranda",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home-filled" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="destination"
          options={{
            tabBarLabel: "Wisata",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="location-on" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  } else {
    return <Redirect href={"/"} />;
  }
}
