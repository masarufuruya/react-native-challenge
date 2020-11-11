import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
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
import CollectionsContainer from '../containers/CollectionsContainer'

const PostScreen = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

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
        <Subscribe to={[CollectionsContainer]}>
          {collectionsStore => (
          <Form>
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
              onPress={() => collectionsStore.addCollection({ name, description })}
            >
              <Text style={styles.saveButtonText}>登録する</Text>
            </Button>
            <Text>現在のフォームの値</Text>
            <Text>{name}</Text>
            <Text>{description}</Text>
          </Form>
          )}
        </Subscribe>
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

export default PostScreen
