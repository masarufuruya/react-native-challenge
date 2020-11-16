import React from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native'
import {
  Button,
} from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'

const PostDetailScreen = () => {
  const route = useRoute();

  const {
    collection
  } = route.params

  return (
    <View>
      <Image
        source={{
          uri: collection.photo
        }}
        style={styles.photo}
      />
      <View style={styles.buttonContainer}>
        <Button bordered warning style={styles.likeButton}>
          <FontAwesome style={styles.likeIcon} name="heart" size={17} color="#EB9D3D" />
          <Text>スキ 0</Text>
        </Button>
        <Button bordered warning style={styles.editButton}>
          <FontAwesome style={styles.editIcon} name="edit" size={24} color="#EB9D3D" />
          <Text>書く</Text>
        </Button>
      </View>
      <ScrollView style={styles.descriptionContainer}>
        <Text>{collection.description}</Text>
      </ScrollView>
    </View>
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
