import LoginScreen from "@/components/LoginScreen";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();

  return (
    <View>
      <SignedIn>
        {/* <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack> */}
        <Redirect href={"/home"} />
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </View>
  );
}
