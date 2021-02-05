import React from 'react'
import { ActivityIndicator, FlatList, Text, View} from 'react-native'
import { axiosGet } from '../../../../utils/axios'
import { Card, Button } from 'react-native-elements'
import { NavigationContext } from '@react-navigation/native'

export default class NewsList extends React.Component{

  static contextType = NavigationContext

  state = {
    isLoaded: false,
    isLoading: false,
    isEnd: false,
    refreshing: false,
    list: [],
    page: 1
  }

  componentDidMount() {
    this.getData()
    console.log(this.context)
  }

  getData() {
    let d = {
      page: this.state.page,
      pageSize: 20,
      cid: this.props.type
    }
    this.setState({
      isLoading: true
    })
    axiosGet('https://test.shop.81hbz.com/v1/forum/lists', d)
      .then(r => {
        this.setState({
          isLoaded: true,
          list: this.state.page == 1 ? r.data.list : [...this.state.list, ...r.data.list],
          isEnd: this.state.page >= r.data.pages
        })
      })
      .catch(e => {
        console.log(e)
      })
      .finally(_ => {
        this.setState({
          isLoading: false
        })
      })
  }

  onRefresh = async _ => {
    this.state.page = 1
    this.setState({
      refreshing: true,
      isEnd: false
    })
    await this.getData()
    this.setState({
      refreshing: false
    })
  }

  getMore = _ => {
    if (this.state.isLoading || this.state.isEnd) {
      return
    }
    this.state.page++
    this.getData()
  }

  renderItem = ({item}) => (
    <Card>
      <Card.Title>{item.title}</Card.Title>
      <Card.Image source={{ uri:item.cover[0]}}></Card.Image>
      <Card.FeaturedTitle>111</Card.FeaturedTitle>
      <Card.Divider />
      <Button title="查看详情" onPress={_ => {this.context.navigate('NewsDetail', {id: item.id})}} />
    </Card>
  )

  render() {
    let { isLoaded, list, refreshing, isEnd } = this.state

    return (
      !isLoaded ? <ActivityIndicator color='blue' size='large'/> :
        <FlatList
          data={list}
          keyExtractor={(i, inx)=> inx.toString()}
          renderItem={this.renderItem}
          ListEmptyComponent={
            _ => <Text>暂无数据</Text>
          }
          onEndReached={this.getMore}
          onEndReachedThreshold={0.1}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
          ListFooterComponent={_=>{
            return isEnd ? <Text>数据加载完毕</Text> : <ActivityIndicator color='red' size='small' />
          }}
        />
    )
  }
}