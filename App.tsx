import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Provider } from 'unstated';

import HomeScreen from './screens/HomeScreen'
import PostScreen from './screens/PostScreen'

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
            } else if (route.name === 'Post') {
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
        <Tab.Screen name="Post" component={PostScreen} options={{ tabBarLabel: '登録' }} />
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

export default App;
