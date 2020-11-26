import React, { useEffect } from "react"
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View
} from 'react-native'
import { signin } from "../utils/Fire"

export const AuthScreen = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const user = await signin()
    }
    fetchUser()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>ログイン中...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 12,
    color: "#888",
  },
})
