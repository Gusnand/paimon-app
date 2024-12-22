import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import { useUser } from "@clerk/clerk-expo";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import { supabase } from "@/utils/supabase";

export default function destination() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState({
    id: 0,
    image: require("../../assets/images/tourism/3.bajrasandhi.jpg"),
    namawisata: "",
    detail: "",
    latitude: 0,
    longitude: 0,
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 100,
    longitudeDelta: 100,
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          });
        } else {
          console.error("Permission to access location was denied");
        }
      } catch (error) {
        console.error("Error getting location:", error);
      }
      setShowDestinationModal(false);
    };

    const getDestinations = async () => {
      setIsLoading(true);
      getLocation();
      const { data, error } = await supabase
        .from("daftarwisata")
        .select("id, image, namawisata, detail, latitude, longitude");

      if (error) {
        setFetchError("Could not fetch from database");
        console.log(error);
      }
      if (data) {
        setDestinations(data);
        setFetchError("");
        console.log(data);
      }
      setIsLoading(false);
    };

    getDestinations();
  }, []);

  //location debugging purposes
  const onRegionChange = (region: any) => {
    console.log(region);
  };

  const showDestinations = () => {
    return destinations.map((destination: any, index: number) => {
      return (
        <Marker
          onPress={() => {
            setSelectedDestination({
              id: destination.id, // Tambahkan ID
              image: destination.image,
              namawisata: destination.namawisata,
              detail: destination.detail,
              latitude: destination.latitude,
              longitude: destination.longitude,
            });
            setShowDestinationModal(true);
          }}
          key={index}
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
        />
      );
    });
  };

  const [fetchError, setFetchError] = useState("");
  const [destinations, setDestinations] = useState<any>([]);

  return (
    <>
      {!isLoading ? (
        <View style={{ flex: 1 }}>
          {/* header --> halaman admin */}
          <View style={{ margin: 24 }}>
            <Header
              headerText={`${
                user?.lastName == "admin" ? "Wisata Admin" : "Admin"
              }`}
            />
          </View>

          <View style={{ flex: 1 }}>
            <MapView
              style={{
                width: "100%",
                height: "100%",
              }}
              showsUserLocation
              showsMyLocationButton
              // onRegionChange={onRegionChange}
              initialRegion={
                currentLocation || {
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 50,
                  longitudeDelta: 50,
                }
              }
            >
              {showDestinations()}
            </MapView>
          </View>
          {showDestinationModal && (
            <View
              style={{
                position: "absolute",
                bottom: 24,
                paddingVertical: 10,
                paddingHorizontal: 24,
                borderRadius: 8,
                backgroundColor: "white",
                alignSelf: "center",
                minWidth: "50%",
                maxWidth: "65%",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Text
                style={{
                  ...FontStyles.quicksandBold,
                  color: Colors.PRIMARY,
                  fontSize: 16,
                }}
              >
                {selectedDestination.namawisata}
              </Text>
              <Text
                style={{
                  ...FontStyles.quicksandRegular,
                  color: Colors.light.text,
                  fontSize: 14,
                }}
              >
                {selectedDestination.detail.substring(0, 20)}...
              </Text>
              <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.PRIMARY,
                    paddingHorizontal: 24,
                    paddingVertical: 4,
                    borderRadius: 4,
                    marginTop: 8,
                  }}
                >
                  <Link href={`/detail-wisata?id=${selectedDestination.id}`}>
                    <Text style={FontStyles.quicksandButtonPrimary}>
                      Detail
                    </Text>
                  </Link>
                </TouchableOpacity>
                {user?.lastName == "admin" ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      borderColor: Colors.PRIMARY,
                      borderWidth: 2,
                      paddingHorizontal: 24,
                      paddingVertical: 4,
                      borderRadius: 4,
                      marginTop: 8,
                    }}
                  >
                    <Link href={"/home"}>
                      <Text style={FontStyles.quicksandButtonSecondary}>
                        Edit
                      </Text>
                    </Link>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </>
  );
}
