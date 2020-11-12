import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const PhotoPreview = (props) => {
  const {
    photo,
    pickImage
  } = props

  return (
    <TouchableOpacity style={styles.container} onPress={() => pickImage()}>
      <MaterialCommunityIcons
        name="camera-plus-outline"
        size={24}
        color="black"
        style={styles.photoIcon}
      />
      <Image
        source={{
          uri: photo
            ? photo.uri
            : ""
        }}
        style={styles.photo}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 5
  },
  photo: {
    width: "100%",
    height: 200,
  },
  photoIcon: {
    fontSize: 50,
    position: "absolute",
    top: 75
  },
});

export default PhotoPreview
