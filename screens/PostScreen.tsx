import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import {
  Button,
  Container,
  Form,
  Textarea,
  Content,
  Input,
  Item,
  Header,
  Left,
  Body,
  Title,
  Right
} from 'native-base'
import { Subscribe } from 'unstated'
import { useNavigation } from '@react-navigation/native';

import CollectionsStore from '../stores/CollectionsStore'

const PostScreenContainer = () => {
  return (
    <Subscribe to={[CollectionsStore]}>
      {collectionsStore => (
        <PostScreen
          collectionsStore={collectionsStore}
        />
      )}
    </Subscribe>
  )
}

const PostScreen = (props) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const navigation = useNavigation();

  const {
    collectionsStore,
  } = props

  useEffect(() => {
    (async () => {
      //カメラロールの許可を取得する
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const resetForm = () => {
    setName("")
    setDescription("")
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
    }
  };

  const onPressSaveButton = () => {
    if (name === "" || description == "") return
    collectionsStore.addCollection({ name, description })
    resetForm()
    navigation.navigate("Home")
    alert("登録しました")
  }

  return (
    <Container>
      <Header>
        <Left/>
        <Body>
          <Title>新規登録</Title>
        </Body>
        <Right/>
      </Header>
      <Content padder>
        <Form>
          <Button
            onPress={() => pickImage()}
          >
            <Text>アップロード</Text>
          </Button>
          <Item regular style={styles.name}>
            <Input
              placeholder='タイトル'
              defaultValue={name}
              onChangeText={(text) => setName(text)}
            />
          </Item>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="説明文"
            defaultValue={description}
            style={styles.description}
            onChangeText={(text) => setDescription(text)}
          />
          <Button
            block
            warning
            style={styles.saveButton}
            onPress={() => onPressSaveButton()}
          >
            <Text style={styles.saveButtonText}>登録する</Text>
          </Button>
          <Text>現在のフォームの値</Text>
          <Text>{name}</Text>
          <Text>{description}</Text>
        </Form>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  name: {
    marginTop: 8
  },
  description: {
    marginTop: 15
  },
  saveButton: {
    marginTop: 15,
  },
  saveButtonText: {
    color: "#fff",
  }
});

export default PostScreenContainer
