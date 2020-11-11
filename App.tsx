import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Provider, Subscribe } from 'unstated';
import CollectionsContainer from './containers/CollectionsContainer';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Subscribe to={[CollectionsContainer]}>
        {collectionsStore => (
          <View>
            <Text>{collectionsStore.state.collections.length}</Text>
          </View>
        )}
      </Subscribe>
    </View>
  );
}

function SettingsScreen() {
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
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // TODO: フォーカスでアイコン変えるかは検討
            // let iconName;
            if (route.name === 'Home') {
              return <FontAwesome name="photo" size={size} color={color} />
            } else if (route.name === 'Settings') {
              // iconName = focused ? 'ios-list-box' : 'ios-list';
              return <FontAwesome name="camera" size={size} color={color} />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'コレクション' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: '登録' }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <Provider>
      <AppContainer/>
    </Provider>
  );
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

export default App;
