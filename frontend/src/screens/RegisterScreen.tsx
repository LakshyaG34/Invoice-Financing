import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { registerUser } from "../services/authService";

export default function RegisterScreen() {
  const [organizationName, setOrganizationName] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const response =
        await registerUser({
          organizationName,
          fullName,
          email,
          password,
        });

      Alert.alert(
        "Success",
        response.message
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.error ||
          "Registration failed !!!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create Account
      </Text>

      <TextInput
        placeholder="Organization Name"
        style={styles.input}
        value={organizationName}
        onChangeText={setOrganizationName}
      />

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
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
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Creating..."
            : "Create Account"}
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