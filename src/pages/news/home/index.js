import React from 'react'
import {View, Text} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { TabView } from 'react-native-tab-view'
import { axiosGet } from '../../../utils/axios'
import { rpx } from '../../../utils/size'
import NewsList from './components/news-list'

export default class NewsHome extends React.Component {

  state = {
    index: 0,
    routes: []
  }

  componentDidMount() {
    axiosGet('https://test.shop.81hbz.com/v1/forum/category')
      .then(r => {
        this.setState({
          routes: r.data.list.map(i => ({
            title: i.title,
            key: i.id,
          }))
        })
      })
  }

  onToggleInx = inx => {
    this.setState({
      index: inx
    })
  }

  getScence = ({route}) => {
    // console.log(t)
    return (
      <NewsList type={route.key} />
    )
  }

  render() {
    let { index, routes } = this.state
    
    return (
      <View style={{flex:1}}>
        <SearchBar />
        <TabView
          // renderTabBar={}
          navigationState={{ index, routes }}
          renderScene={this.getScence}
          onIndexChange={this.onToggleInx}
          initialLayout={{width: rpx(750)}}
        />
      </View>
    )
  }
}