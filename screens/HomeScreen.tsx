import React from 'react'
import { View } from 'react-native'
import { Subscribe } from 'unstated';
import CollectionsStore from '../stores/CollectionsStore'

import CollectionsGridView from '../components/CollectionsGridView'

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Subscribe to={[CollectionsStore]}>
        {collectionsStore => (
          <CollectionsGridView
            collections={collectionsStore.state.collections}
          />
        )}
      </Subscribe>
    </View>
  )
}

export default HomeScreen

