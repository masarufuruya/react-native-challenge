import React from 'react'
import {
  ScrollView,
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  View
} from 'react-native'

const ITEM_WIDTH = Dimensions.get('window').width;

const CollectionsGridView = (props) => {
  const {
    collections,
  } = props

  return (
    <ScrollView>
      <FlatList
        data={collections}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}

        renderItem={({ item }) => (
          <View>
          <Image
            source={{ uri: item.photo }}
            style={styles.imageStyle}
            />
          </View>
        )}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  imageStyle: {
    width: ITEM_WIDTH / 3,
    height: ITEM_WIDTH / 3,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: "#333"
  }
});

export default CollectionsGridView
