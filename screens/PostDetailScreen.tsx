import React from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useRoute } from '@react-navigation/native';

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
});

export default PostDetailScreen
