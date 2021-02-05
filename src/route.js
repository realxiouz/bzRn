import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from "./pages/tab/home/index"
import MePage from "./pages/tab/me/index"
import SplashPage from './pages/splash/index'
import DebuggerWechatPage from "./pages/debugger/wechat/index"
import DebuggerSvgPage from "./pages/debugger/svg/index"
import DebuggerPage from "./pages/debugger/home/index"

import NewsHomePage from './pages/news/home/index'
import NewsDetailPage from './pages/news/detail/index'
import LoginPage from "./pages/auth/login"
import Ionicons from 'react-native-vector-icons/Ionicons'

// import MapPage from "../pages/debug/map";
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { rpx } from "./utils/size"

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'lightblue' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
            key={index}
          >
            <Image source={require('./assets/icon-0.png')} style={{width: rpx(isFocused?60:40), height: rpx(isFocused?60:40)}}  />
            {
              isFocused ? null :
              <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
              </Text>
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Home() {
  return (
    <Tab.Navigator
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName;

      //     if (route.name === 'Home') {
      //       iconName = focused
      //         ? 'ios-information-circle'
      //         : 'ios-information-circle-outline';
      //     } else if (route.name === 'Me') {
      //       iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
      //     }

      //     // You can return any component that you like here!
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      // })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: true
      }}

      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomePage}></Tab.Screen>
      <Tab.Screen name="Me" component={MePage}></Tab.Screen>
      <Tab.Screen name="Me1" component={MePage}></Tab.Screen>
    </Tab.Navigator>
  )
}


export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={SplashPage} ></Stack.Screen>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name='Debugger' component={DebuggerPage} />
        <Stack.Screen name="DebuggerWechat" component={DebuggerWechatPage}></Stack.Screen>
        <Stack.Screen name="DebuggerSvg" component={DebuggerSvgPage}></Stack.Screen>
        {/* <Stack.Screen name="Map" component={MapPage}></Stack.Screen> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewsHome" component={NewsHomePage} />
        <Stack.Screen name="NewsDetail" component={NewsDetailPage} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}