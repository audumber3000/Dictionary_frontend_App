import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'

export default function PlayAndProg() {
  return (
    <>
    <TouchableOpacity>
            <View style={styles.containercard2}>
              <View style={styles.innercard2}>
                <Image
                  style={{ width: 81, height: 77 }}
                  source={require("../../../assets/Rectangle2.png")}
                />
                <Text
                  style={{
                    color: "#F24E1E",
                    fontSize: 20,
                    fontWeight: "900",
                    top: 5,
                    left: 5,
                  }}
                >
                  Guess
                </Text>
                <Image
                  style={{ height: 20, width: 20, right: 40, bottom: 17 }}
                  source={require("../../../assets/Vector2.png")}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#ADB4E8",
                height: 140,
                width: 125,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  style={{ width: 81, height: 77 }}
                  source={require("../../../assets/Rectangle1.png")}
                />
                <Text
                  style={{
                    color: "#7781D4",
                    fontSize: 20,
                    fontWeight: "900",
                    top: 5,
                    left: 5,
                  }}
                >
                  Write
                </Text>
                <Image
                  style={{ height: 20, width: 20, right: 40, bottom: 17 }}
                  source={require("../../../assets/Vector1.png")}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#F3B69B",
                height: 140,
                width: 125,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  style={{ width: 81, height: 77 }}
                  source={require("../../../assets/Rectangle2.png")}
                />
                <Text
                  style={{
                    color: "#F24E1E",
                    fontSize: 20,
                    fontWeight: "900",
                    top: 5,
                    left: 5,
                  }}
                >
                  Guess
                </Text>
                <Image
                  style={{ height: 20, width: 20, right: 40, bottom: 17 }}
                  source={require("../../../assets/Vector2.png")}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#ADB4E8",
                height: 140,
                width: 125,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  style={{ width: 81, height: 77 }}
                  source={require("../../../assets/Rectangle1.png")}
                />
                <Text
                  style={{
                    color: "#7781D4",
                    fontSize: 20,
                    fontWeight: "900",
                    top: 5,
                    left: 5,
                  }}
                >
                  Write
                </Text>
                <Image
                  style={{ height: 20, width: 20, right: 40, bottom: 17 }}
                  source={require("../../../assets/Vector1.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  containercard2: {
    backgroundColor: "#F3B69B",
    height: 140,
    width: 125,
    margin: 10,
    borderRadius: 10,
  },
  innercard2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
})