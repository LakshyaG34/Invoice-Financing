import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function WelcomeScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() =>
          navigation.navigate("Register")
        }
      >
        <Text style={styles.hamburgerText}>
          ☰
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        InvoiceFlow
      </Text>

      <Text style={styles.subtitle}>
        Manage invoices, receivables and financing
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Register")
        }
      >
        <Text style={styles.buttonText}>
          Get Started
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

  hamburger: {
    position: "absolute",
    top: 60,
    left: 20,
  },

  hamburgerText: {
    fontSize: 30,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#000",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});