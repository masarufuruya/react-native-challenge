import React, { Component } from 'react'
import { View, ScrollView, SafeAreaView, RefreshControl } from 'react-native'
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
  constructor(props) {
    super(props)

    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  async onRefresh() {
    this.setState({ refreshing: true })
    const { authUserStore, collectionsStore } = this.props
    collectionsStore.getCollections(authUserStore.state.user.id)
    this.setState({ refreshing: false })
  }

  render() {
    const { collectionsStore } = this.props
    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
        >
          <CollectionsGridView
            collections={collectionsStore.state.collections}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default HomeScreenContainer

