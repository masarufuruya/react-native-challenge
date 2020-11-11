import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Provider } from 'unstated';

import HomeScreen from './screens/HomeScreen'
import PostScreen from './screens/PostScreen'

const Tab = createBottomTabNavigator();

// Setup for bottom tab navigation
// const BottomTabNav = createBottomTabNavigator(
//   {
//     Posts: {
//       screen: PostScreen
//     },
//     Albums: {
//       screen: AlbumScreen
//     },
//     Tasks: {
//       screen: TaskScreen
//     },
//     Friends: {
//       screen: FriendScreen
//     },
//     Profile: {
//       screen: ProfileScreen
//     }
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => {
//         // Determines which icon to show and what color it is
//         const { routeName } = navigation.state;
//         const iconName = bottomNavIconMap[routeName];

//         return (
//           <Icon
//             name={iconName}
//             color={tintColor}
//             size={25}
//             style={{ marginTop: 5 }}
//           />
//         );
//       }
//     }),
//     tabBarOptions: {
//       activeTintColor: "black",
//       inactiveTintColor: "gray",
//       activeBackgroundColor: theme.SECONDARY_COLOR,
//       inactiveBackgroundColor: theme.SECONDARY_COLOR,
//       labelStyle: {
//         marginBottom: 5
//       }
//     }
//   }
// );

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
