// import { LinearGradient } from "expo-linear-gradient";
// import { ScrollView, StyleSheet, Text, View } from "react-native";

// export default function HomeScreen() {
//   return (
//     <ScrollView>
//       <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
//         <View>
//           <View>
//             <View>
//               <Text> Daily Progress Drug</Text>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });


import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.topHalfContainer}>
        <LinearGradient
          colors={["#4CAF50", "#2E7D32"]}
          style={styles.gradient}
        >
          <View style={styles.centerContent}>
            <Text style={styles.centerText}>Daily Progress Drug</Text>
          </View>
        </LinearGradient>
      </View>
      {/* You can add more content below if needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topHalfContainer: {
    height: height * 0.5,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});