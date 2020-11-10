import * as React from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { Provider, Subscribe } from 'unstated';
import HomeScreenContainer from './containers/HomeScreenContainer';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Subscribe to={[HomeScreenContainer]}>
        {container => (
          <View>
            <Text onPress={() => container.decrement()}>-</Text>
            <Text>{container.state.count}</Text>
            <Text onPress={() => container.increment()}>+</Text>
          </View>
        )}
      </Subscribe>
    </View>
  );
}

function SettingsScreen() {
  return (
    <Container>
      <Header>
        <Left/>
        <Body>
          <Title>Settings</Title>
        </Body>
        <Right/>
      </Header>
      <Content padder>
        <Form>
          <Item regular style={styles.name}>
            <Input placeholder='name' />
          </Item>
          <Textarea rowSpan={5} bordered placeholder="description" style={styles.description} />
          <Button block warning style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Button>
        </Form>
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
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
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
