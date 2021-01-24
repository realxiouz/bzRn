import React from 'react'
import { ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native'
import { axiosGet } from '../../../../utils/axios'
import { Avatar, Card } from 'react-native-elements'
import { View, Text } from 'react-native'
import { Button } from 'react-native'

export default class OrderList extends React.Component {

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
  }

  getData() {
    let d = {
      page: this.state.page,
      type: 'noconfirm',
      order_type: 'delivery',
      reservation: this.props.type,
    }
    console.log(d)
    this.setState({
      isLoading: true
    })
    axiosGet('store/order/index', d)
      .then(r => {
        this.setState({
          isLoaded: true,
          list: this.state.page == 1 ? r.data.result.data : [...this.state.list, ...r.data.result.data],
          isEnd: this.state.page >= r.data.result.last_page
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

  renderCard = ({item}) => (
    <Card>
      <Card.Title>{item.order_sn}</Card.Title>
      <Card.Divider />
      <Button title="查看详情" />
    </Card>
  )

  render() {
    let { isLoaded, list, refreshing, isEnd } = this.state
    return (
      !isLoaded ? <ActivityIndicator color='blue' size='large'/> :
        <FlatList
          data={list}
          keyExtractor={(i, inx)=> inx.toString()}
          renderItem={this.renderCard}
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