import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { loginUser } from "../services/authService";
import {
  getToken,
  saveToken,
} from "../services/authStorage";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {

  const navigation = useNavigation<any>();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {

      setLoading(true);

      const response =
        await loginUser({
          email,
          password,
        });

      await saveToken(
        response.token
      );

      await saveToken(response.token);

      const token =
        await getToken();

      console.log(token);

      console.log(
        "TOKEN:",
        response.token
      );

      navigation.replace(
        "Dashboard"
      );

    } catch (error: any) {

      Alert.alert(
        "Error",
        error?.response?.data?.error ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome Back
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {
            loading
              ? "Signing In..."
              : "Login"
          }
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

});