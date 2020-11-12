import React from 'react'
import { View, Text } from 'react-native'
import { Subscribe } from 'unstated';
import CollectionsStore, { Collection } from '../stores/CollectionsStore'

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Subscribe to={[CollectionsStore]}>
        {collectionsStore => (
          <View>
            {
              collectionsStore.state.collections.map((collection: Collection, index: number) => {
                return (
                  <View key={index}>
                    <Text>{collection.name}</Text>
                    <Text>{collection.description}</Text>
                  </View>
                )
              })
            }
          </View>
        )}
      </Subscribe>
    </View>
  )
}

export default HomeScreen

