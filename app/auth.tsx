import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthenticationType } from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  const [error, setError] = useState< string | null>(null);
  const [biometricType, setBiometricType] = useState<string | null>(null);

  const router = useRouter();

  const checkBiomatric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    setHasBiometric(hasHardware && isEnrolled);
  };

  useEffect(() => {
    checkBiomatric();
  }, []);

  const authenticate = async () => {
    try {
      setError(null);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (supportedTypes.includes(AuthenticationType.FINGERPRINT)) {
        setBiometricType("Fingerprint");
      } else if (
        supportedTypes.includes(AuthenticationType.FACIAL_RECOGNITION)
      ) {
        setBiometricType("Face ID");
      } else {
        setBiometricType(null);
      }

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: hasHardware && isEnrolled ? `Use ${biometricType } ` : "Enter your PIN to continue",
        fallbackLabel: "Enter PIN",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (auth.success) {
        router.replace("/home");
      } else {
        setError("Authentication failed. Please try again.");
      } 
    } catch (error) {
        setError("An error occurred during authentication. Please try again.");
    }
  };

  return (
    <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="medical" size={80} color="white" />
        </View>
        <Text style={styles.title}>MedRemind</Text>
        <Text style={styles.subtitle}>Your Personal Medication Reminder</Text>
        <View style={styles.card}>
          <Text style={styles.welcomeBack}>Welcome Back!</Text>
          <Text style={styles.instructionText}>
            {hasBiometric
              ? `Use ${biometricType ?? "biometric"} or enter your PIN to continue`
              : "Enter your PIN to continue"}
          </Text>

          <TouchableOpacity
            style={[styles.button, isAutenticating && styles.buttonDisabled]}
            onPress={authenticate}
            disabled={isAutenticating}
          >
            <Ionicons
              name={hasBiometric ? "finger-print-outline" : "key-outline"}
              size={24}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {isAutenticating
                ? "Verifying..."
                : hasBiometric
                ? "Authenticate"
                : "Enter PIN"}
            </Text>
          </TouchableOpacity>
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color={"#f44336"} />
              <Text style={styles.errorText}>{error}</Text>
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
  },
  welcomeBack: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  instructionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffebee",
    borderRadius: 8,
  },
  errorText: {
    color: "#f44336",
    marginLeft: 8,
    fontSize: 14,
  },
});
