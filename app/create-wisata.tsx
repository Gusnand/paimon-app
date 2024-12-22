import { Colors } from "@/constants/Colors";
import { FontStyles } from "@/constants/Fonts";
import { supabase } from "@/utils/supabase";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Platform,
  PermissionsAndroid,
  Button,
  Alert,
} from "react-native";
import Header from "@/components/Layout/Header";
import * as ImagePicker from "expo-image-picker";

export default function CreateWisata() {
  const { lang, lat, from } = useLocalSearchParams(); // Ambil ID dari parameter URL
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  //form field
  const [namawisata, setNamawisata] = useState("");
  const [detail, setDetail] = useState("");
  const [region, setRegion] = useState("");
  // view set 1
  const [alamat, setAlamat] = useState("");
  // like
  const [image, setImage] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    try {
      // Validate inputs
      if (!namawisata || !detail || !region || !alamat || !image) {
        Alert.alert("Error", "Tolong lengkapi semua kolom!");
        return;
      }

      // Upload image to Supabase Storage
      console.log(image);

      const { data, error } = await supabase.storage
        .from("tourism-images")
        .upload(`wisata_${Date.now()}.jpg`, {
          uri: image,
          mimeType: "image/jpeg",
        });

      if (error) {
        Alert.alert("Error", "Failed to upload image.");
        console.error("Error uploading image:", error);
        return;
      }

      setImageUrl(data.path); // Store the uploaded image URL

      // Insert data into database with image URL
      const { data: wisataData, error: dbError } = await supabase
        .from("daftarwisata")
        .insert([
          {
            namawisata,
            detail,
            region,
            alamat,
            image: data.path,
            latitude: lat,
            longitude: lang,
            view: 1,
            like: 1,
          },
        ]);

      if (dbError) {
        Alert.alert("Error", "Failed to create wisata.");
        console.error("Error creating wisata:", dbError);
      } else {
        console.log("Wisata created successfully:", wisataData);
        router.back();
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred.");
      console.error("Error creating wisata:", error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 24,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 24,
          display: "flex",
          width: "100%",
        }}
      >
        <Header
          headerText="Tempat Wisata Baru"
          withBackButton
          linkHref={"/destination"}
        />
      </View>
      <TextInput
        autoCapitalize="none"
        value={namawisata}
        placeholder="Nama Tempat Wisata"
        onChangeText={(emailAddress) => setNamawisata(emailAddress)}
        style={{
          ...FontStyles.quicksand14Desc,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 12,
          borderColor: "#AAAAAA",
          borderWidth: 2,
          borderStyle: "solid",
          marginBottom: 12,
          color: "#AAAAAA",
          width: "100%",
          display: "flex",
          gap: 12,
        }}
      />
      {/* <TextInput
        autoCapitalize="none"
        value={image}
        placeholder="Foto Tempat Wisata"
        onChangeText={(emailAddress) => setImage(emailAddress)}
        style={{
          ...FontStyles.quicksand14Desc,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 12,
          borderColor: "#AAAAAA",
          borderWidth: 2,
          borderStyle: "solid",
          marginBottom: 12,
          color: "#AAAAAA",
          width: "100%",
          display: "flex",
          gap: 12,
        }}
      /> */}
      <View style={styles.container}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <TextInput
        autoCapitalize="none"
        value={alamat}
        placeholder="Alamat Tempat Wisata"
        onChangeText={(emailAddress) => setAlamat(emailAddress)}
        style={{
          ...FontStyles.quicksand14Desc,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 12,
          borderColor: "#AAAAAA",
          borderWidth: 2,
          borderStyle: "solid",
          marginBottom: 12,
          color: "#AAAAAA",
          width: "100%",
          display: "flex",
          gap: 12,
        }}
      />
      <TextInput
        autoCapitalize="none"
        value={region}
        placeholder="Region Tempat Wisata"
        onChangeText={(emailAddress) => setRegion(emailAddress)}
        style={{
          ...FontStyles.quicksand14Desc,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 12,
          borderColor: "#AAAAAA",
          borderWidth: 2,
          borderStyle: "solid",
          marginBottom: 12,
          color: "#AAAAAA",
          width: "100%",
          display: "flex",
          gap: 12,
        }}
      />
      <TextInput
        autoCapitalize="none"
        value={detail}
        placeholder="Tentang Tempat Wisata"
        onChangeText={(emailAddress) => setDetail(emailAddress)}
        style={{
          ...FontStyles.quicksand14Desc,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 12,
          borderColor: "#AAAAAA",
          borderWidth: 2,
          borderStyle: "solid",
          marginBottom: 12,
          color: "#AAAAAA",
          width: "100%",
          display: "flex",
          gap: 12,
        }}
      />
      {/* <Button title="Sign in" onPress={onSignInPress} /> */}
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          borderRadius: 12,
          padding: 12,
        }}
      >
        <Text style={FontStyles.quicksandButtonPrimary}>
          Buat Tempat Wisata
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
