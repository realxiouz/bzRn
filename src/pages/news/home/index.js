import React from 'react'
import {View, Text} from 'react-native'
import { TabView } from 'react-native-tab-view'

export default class NewsHome extends React.Component {

  

  render() {
    return (
      <View>
        <TabView
          // renderTabBar={}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    )
  }
}