import React from 'react'
import { Text, View } from 'react-native'
import { Collection } from '../stores/CollectionsStore';

type PropsType = {
  collection: Collection
}

const PostDetailScreen = (props: PropsType) => {
  const {
    collection
  } = props

  return (
    <View>
      <Text>{collection.name}</Text>
      <Text>{collection.description}</Text>
    </View>
  )
}

export default PostDetailScreen
