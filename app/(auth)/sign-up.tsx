import * as React from "react";
import { Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Layout/Header";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        username,
        password,
        firstName: displayName,
        lastName: "user",
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",

          marginHorizontal: 24,
        }}
      >
        <>
          <TextInput
            style={{
              ...FontStyles.quicksand14Desc,
              backgroundColor: "#ffffff",
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
            value={code}
            placeholder="Masukkan kode verifikasi"
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity
            onPress={onVerifyPress}
            style={{
              backgroundColor: Colors.PRIMARY,
              width: "100%",
              borderRadius: 12,
              padding: 12,
              marginTop: 24,
            }}
          >
            <Text style={FontStyles.quicksandButtonPrimary}>
              Kirim Kode Verikasi
            </Text>
          </TouchableOpacity>
        </>
        <View
          style={{
            position: "absolute",
            top: 24,
            display: "flex",
            width: "100%",
          }}
        >
          <Header headerText="Verifikasi" />
          <Text
            style={{
              ...FontStyles.quicksandSemiBold,
              color: Colors.Gray,
              fontSize: 16,
              marginTop: 8,
            }}
          >
            Cek email anda untuk mendapatkan kode verifikasi
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 24,
      }}
    >
      <>
        <View
          style={{
            position: "absolute",
            top: 24,
            display: "flex",
            width: "100%",
          }}
        >
          <Header headerText="Bergabung" />
        </View>
        <TextInput
          autoCapitalize="none"
          value={username}
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
          style={{
            ...FontStyles.quicksand14Desc,
            backgroundColor: "#ffffff",
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
          value={emailAddress}
          placeholder="Email"
          onChangeText={(email) => setEmailAddress(email)}
          style={{
            ...FontStyles.quicksand14Desc,
            backgroundColor: "#ffffff",
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
          value={displayName}
          placeholder="Nama Pengguna"
          onChangeText={(displayName) => setDisplayName(displayName)}
          style={{
            ...FontStyles.quicksand14Desc,
            backgroundColor: "#ffffff",
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
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={{
            ...FontStyles.quicksand14Desc,
            backgroundColor: "#ffffff",
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
        {/* <Button title="Continue" onPress={onSignUpPress} /> */}
        <TouchableOpacity
          onPress={onSignUpPress}
          style={{
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            borderRadius: 12,
            padding: 12,
            marginTop: 24,
          }}
        >
          <Text style={FontStyles.quicksandButtonPrimary}>Bergabung</Text>
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
            Sudah punya akun?{" "}
          </Text>
          <Link href="/sign-in">
            <Text style={{ ...FontStyles.quicksand14, color: Colors.PRIMARY }}>
              {" "}
              Masuk
            </Text>
          </Link>
        </View>
      </>
    </View>
  );
}
