import React, { useRef } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import {
  Button,
} from 'native-base'
import { Subscribe } from 'unstated'
import { FontAwesome } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

import PostDetailScreenStore from '../stores/PostDetailScreenStore'
import CollectionsStore from '../stores/CollectionsStore'
import ImageModal from '../components/ImageModal'

const PostDetailScreen = () => {
  const animation = useRef(null)
  const route = useRoute()
  const navigation = useNavigation()

  const {
    collection
  } = route.params

  const onPressLikeButton = (collectionsStore, id: string) => {
    animation.current.play()
    collectionsStore.likeCollection(id)
  }

  const onPressEditButton = () => {
    navigation.navigate('EditPost', { collection })
  }

  return (
    <Subscribe to={[PostDetailScreenStore, CollectionsStore]}>
      {(screenStore, collectionsStore) => (
        <View>
          <TouchableWithoutFeedback
            onPress={() => screenStore.toggleModal()}
          >
            <Image
              source={{
                uri: collection.photo
              }}
              style={styles.photo}
            />
          </TouchableWithoutFeedback>
          <ImageModal
            imageUrl={collection.photo}
            screenStore={screenStore}
          />
          <View style={styles.buttonContainer}>
            <Button
              bordered
              warning
              style={styles.likeButton}
              onPress={() => onPressLikeButton(collectionsStore, collection.id)}
            >
              <LottieView
                source={require('../assets/fav.json')}
                ref={animation}
                style={{
                  height: 40,
                }}
                loop={false}
              />
              <Text>スキ {collection.likeCount ? collection.likeCount : 0}</Text>
            </Button>
            <Button
              bordered
              warning
              style={styles.editButton}
              onPress={() => onPressEditButton()}
            >
              <FontAwesome style={styles.editIcon} name="edit" size={24} color="#EB9D3D" />
              <Text>書く</Text>
            </Button>
          </View>
          <ScrollView style={styles.descriptionContainer}>
            <Text>{collection.description}</Text>
          </ScrollView>
        </View>
      )}
    </Subscribe>
  )
}

const styles = StyleSheet.create({
  descriptionContainer: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    height: 400,
  },
  photo: {
    width: "100%",
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  likeButton: {
    width: 120,
    justifyContent: 'center',
    marginRight: 15
  },
  likeIcon: {
    marginRight: 5,
    marginTop: 1
  },
  editButton: {
    width: 120,
    justifyContent: 'center',
  },
  editIcon: {
    marginRight: 5,
    marginTop: 1
  },
});

export default PostDetailScreen
