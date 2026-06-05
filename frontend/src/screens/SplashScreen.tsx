import {
  useEffect,
} from "react";

import {
  ActivityIndicator,
  View,
} from "react-native";

import {
  getToken,
} from "../services/authStorage";

export default function SplashScreen({
  navigation,
}: any) {

  useEffect(() => {

    const checkAuth =
      async () => {

        const token =
          await getToken();

        if (token) {

          navigation.replace(
            "Dashboard"
          );

        } else {

          navigation.replace(
            "Login"
          );

        }
      };

    checkAuth();

  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}