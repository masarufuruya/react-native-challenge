import React from 'react'
import {
  ScrollView,
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import { Collection } from '../stores/CollectionsStore';
import { useNavigation } from '@react-navigation/native';

type PropsType = {
  collections: Array<Collection>
}

const ITEM_WIDTH = Dimensions.get('window').width;

const CollectionsGridView = (props: PropsType) => {
  const navigation = useNavigation();

  const {
    collections,
  } = props

  return (
    <ScrollView>
      <FlatList
        data={collections}
        keyExtractor={(item: Collection, index: number) => index.toString()}
        numColumns={3}

        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PostDetail')}>
            <View>
              <Image
                source={{ uri: item.photo }}
                style={styles.imageStyle}
              />
            </View>
          </TouchableOpacity>
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
