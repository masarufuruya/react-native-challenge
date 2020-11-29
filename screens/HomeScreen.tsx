import React, { Component } from 'react'
import { View } from 'react-native'
import { Subscribe } from 'unstated';

/* components */
import CollectionsGridView from '../components/CollectionsGridView'

/* stores */
import AuthUserStore from '../stores/AuthUserStore';
import CollectionsStore from '../stores/CollectionsStore';

// HOC化してcollectionsStoreを渡すことでHomeScreen内でstoreへアクセスできるようにする
const HomeScreenContainer = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Subscribe to={[AuthUserStore, CollectionsStore]}>
        {(authUserStore, collectionsStore) => (
          <HomeScreen
            authUserStore={authUserStore}
            collectionsStore={collectionsStore}
          />
        )}
      </Subscribe>
    </View>
  )
}

class HomeScreen extends Component {
  componentDidMount() {
    const {
      authUserStore,
      collectionsStore
    } = this.props
    collectionsStore.initializeCollectionsStore(authUserStore.state.user.id)
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

