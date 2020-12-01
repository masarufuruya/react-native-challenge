import React, { useEffect } from "react"
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View
} from 'react-native'
import { Subscribe } from "unstated"
import { signin } from "../utils/Fire"

/* store */
import AuthUserStore from '../stores/AuthUserStore';

const AuthScreenContainer = () => {
  return (
    <Subscribe to={[AuthUserStore]}>
      {authUserStore => (
        <AuthScreen
          authUserStore={authUserStore}
        />
      )}
    </Subscribe>
  )
}

const AuthScreen = (props) => {
  const { authUserStore } = props

  useEffect(() => {
    const fetchUser = async () => {
      const user = await signin()
      authUserStore.setAuthUser(user)
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

export default AuthScreenContainer

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
