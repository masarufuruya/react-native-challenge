import React from 'react'
import { Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native';

const PostDetailScreen = () => {
  const route = useRoute();

  const {
    collection
  } = route.params

  return (
    <View>
      <Text>{collection.name}</Text>
      <Text>{collection.description}</Text>
    </View>
  )
}

export default PostDetailScreen
