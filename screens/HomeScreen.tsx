import React, { Component } from 'react'
import { View } from 'react-native'
import { Subscribe } from 'unstated';

import CollectionsStore from '../stores/CollectionsStore';
import CollectionsGridView from '../components/CollectionsGridView'

// HOC化してcollectionsStoreを渡すことでHomeScreen内でstoreへアクセスできるようにする
const HomeScreenContainer = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Subscribe to={[CollectionsStore]}>
        {collectionsStore => (
          <HomeScreen
            collectionsStore={collectionsStore}
          />
        )}
      </Subscribe>
    </View>
  )
}

class HomeScreen extends Component {
  componentDidMount() {
    const { collectionsStore } = this.props
    collectionsStore.initializeCollectionsStore()
  }

  render() {
    const { collectionsStore } = this.props
    return (
      <CollectionsGridView
        collections={collectionsStore.state.collections}
      />
    )
  }
}

export default HomeScreenContainer

