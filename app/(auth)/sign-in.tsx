import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { FontStyles } from "@/constants/Fonts";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Masukkan email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
          width: "90%",
          display: "flex",
          position: "relative",
          paddingHorizontal: 24,
          marginHorizontal: 12,
          gap: 12,
        }}
      />
      <TextInput
        value={password}
        placeholder="Masukkan password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={{
          ...FontStyles.quicksand14Desc,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 12,
          color: "#AAAAAA",
          borderColor: "#AAAAAA",
          borderWidth: 2,
          borderStyle: "solid",
          marginBottom: 12,
          width: "90%",
          display: "flex",
          position: "relative",
          paddingHorizontal: 24,
          marginHorizontal: 12,
          gap: 12,
        }}
      />
      <View
        style={{
          paddingBottom: 24,
          display: "flex",
          width: "90%",
          alignItems: "flex-end",
        }}
      >
        <Link href="/">
          <Text
            style={{
              ...FontStyles.quicksand14,
              color: Colors.PRIMARY,
            }}
          >
            Lupa Kata Sandi?
          </Text>
        </Link>
      </View>
      {/* <Button title="Sign in" onPress={onSignInPress} /> */}
      <TouchableOpacity
        onPress={() => {
          onSignInPress;
        }}
        style={{
          backgroundColor: Colors.PRIMARY,
          width: "90%",
          borderRadius: 12,
          padding: 12,
        }}
      >
        <Text style={FontStyles.quicksandButtonPrimary}>Masuk</Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 24,
        }}
      >
        <Text style={{ ...FontStyles.quicksand14Desc }}>
          Belum punya akun?{" "}
        </Text>
        <Link href="/sign-up">
          <Text style={{ ...FontStyles.quicksand14, color: Colors.PRIMARY }}>
            {" "}
            Bergabung
          </Text>
        </Link>
      </View>
    </View>
  );
}
