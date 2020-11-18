import React, { useState } from 'react'
import { Button, StyleSheet, View, Image } from 'react-native'
import Modal from 'react-native-modal'

type PropsType = {
  imageUrl: string
}

const ImageModal = (props: PropsType) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    imageUrl
  } = props

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
      >
        <View>
          <Image
            source={{
              uri: imageUrl
            }}
            style={styles.photo}
          />
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  photo: {
    width: "100%",
    height: 400,
  },
})

export default ImageModal
