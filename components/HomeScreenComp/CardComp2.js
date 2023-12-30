import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import CompeteAndWin from "./CompeteAndWin/CompeteAndWin";
import PlayAndProg from "./PlayAndProgress/PlayAndProg";
import CompeteAndWin1 from "../../AmitModule/CompeteAndWin1";

export default function CardComp2() {
  const color = ["rgba(166, 120, 242, 0.2)", "rgba(79, 79, 79, 0.1)"];
  return (
    <View style={styles.container}>
      {/* Compete and Win Section */}
      <CompeteAndWin1 />

      {/* Play annd Progress Card */}
      <View style={styles.container3}>
        <Text style={styles.headtext2}>Play and Progress</Text>
        <ScrollView horizontal contentContainerStyle={{ margin: 7 }}>
          <PlayAndProg />
        </ScrollView>
      </View>
      {/* Play annd Progress Card End.... */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  container2: {},
  container3: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
    top: 45,
  },
  headtext1: {
    fontSize: 24,
    right: 90,
    fontWeight: "900",
    color: "#263238",
    opacity: 0.7,
  },
  headtext2: {
    fontSize: 24,
    right: 90,
    fontWeight: "600",
    color: "#263238",
    opacity: 0.7,
    paddingLeft: 0,
  },
});
