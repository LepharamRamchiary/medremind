import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function AuthScreen() {
  const [hasBiometric, setHasBiometric] = useState(false);
  const [isAutenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  return (
    <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="medical" size={80} color="white" />
        </View>
        <Text style={styles.title}>MedRemind</Text>
        <Text style={styles.subtitle}>Your Personal Medication Reminder</Text>
        <View style={styles.card}>
          <Text>Welcome Back!</Text>
          <Text>
            {hasBiometric
              ? "Use face ID/Touch ID or enter your PIN to continue"
              : "Enter your PIN to continue"}
          </Text>

          <TouchableOpacity>
            <Ionicons
              name={hasBiometric ? "finger-print-outline" : "key-outline"}
              size={24}
              color="white"
            />
            <Text>
              {isAutenticating
                ? "Verifying..."
                : hasBiometric
                ? "Authenticate"
                : "Enter PIN"}
            </Text>
          </TouchableOpacity>
          {error && (
            <View>
              <Ionicons name="alert-circle" size={20} color={"#f44336"} />
              <Text>{error}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    iconContainer: {
        width: 120,
        height: 120,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle: {
        fontSize: 18,
        color: "rgba(255, 255, 255, 0.9)",
        marginBottom: 40,
        textAlign: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        width: width - 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    }

})
