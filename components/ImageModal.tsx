import React, { useState } from 'react'
import { Button, StyleSheet, View, Image } from 'react-native'
import Modal from 'react-native-modal'

type PropsType = {
  imageUrl: string,
  screenStore: object
}

const ImageModal = (props: PropsType) => {
  const {
    imageUrl,
    screenStore
  } = props

  return (
    <View>
      <Modal
        isVisible={screenStore.state.isModalVisible}
        onBackdropPress={() => screenStore.toggleModal()}
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
