import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from "./pages/tab/home/index"
import MePage from "./pages/tab/me/index"
import SplashPage from './pages/splash/index'
import DebuggerWechatPage from "./pages/debugger/wechat/index"
import DebuggerSvgPage from "./pages/debugger/svg/index"

import NewsHomePage from './pages/news/home/index'
import LoginPage from "./pages/auth/login"

// import MapPage from "../pages/debug/map";
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage}></Tab.Screen>
      <Tab.Screen name="Me" component={MePage}></Tab.Screen>
    </Tab.Navigator>
  )
}


export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={SplashPage} ></Stack.Screen>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="DebuggerWechat" component={DebuggerWechatPage}></Stack.Screen>
        <Stack.Screen name="DebuggerSvg" component={DebuggerSvgPage}></Stack.Screen>
        {/* <Stack.Screen name="Map" component={MapPage}></Stack.Screen> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewsHome" component={NewsHomePage} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}