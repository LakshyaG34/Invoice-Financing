import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  removeToken,
} from "../services/authStorage";

export default function DashboardScreen({
  navigation,
}: any) {

  const handleLogout = async () => {

    await removeToken();

    navigation.replace(
      "Login"
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        InvoiceFlow
      </Text>

      <Text style={styles.subtitle}>
        Welcome to your dashboard
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#111827",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

});