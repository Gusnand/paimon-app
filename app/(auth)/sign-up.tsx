import * as React from "react";
import { Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { FontStyles } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
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
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 24,
      }}
    >
      <>
        <Text style={{ ...FontStyles.quicksandHeaderPage, marginBottom: 24 }}>
          Sign up
        </Text>
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
      </>
    </View>
  );
}
