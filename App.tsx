import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { Provider } from 'unstated';

import HomeScreen from './screens/HomeScreen'
import PostScreen from './screens/PostScreen'
import PostDetailScreen from './screens/PostDetailScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "コレクション"
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={({ route }) => (
          {
            title: route.params.collection.name
          }
        )}
      />
    </Stack.Navigator>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStacks}
        options={{
          tabBarLabel: 'コレクション',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="photo" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarLabel: '登録',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="camera" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Tabs/>
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

export default App;
