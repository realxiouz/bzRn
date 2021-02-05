import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native' 
import { axiosGet } from '../../../utils/axios'
import { rpx } from '../../../utils/size'
import { Button, Input } from 'react-native-elements'

let style = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 0,
    height: rpx(100),
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default class NewsDetail extends React.Component {
  
  id = 0

  input = React.createRef()

  componentDidMount() {
    let { id } = this.props.route.params
    this.id = id
    this.getData()
  }

  getData = async _ => {
    let { data } = await axiosGet('https://test.shop.81hbz.com/v1/forum/detail', {aid: this.id})
    // this.setState({
    //   res
    // })
  }

  onBtn = e => {
    this.input.current.shake()
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={style.bar}>
          <Input
            containerStyle={{
              height: rpx(80),
              borderRadius: rpx(40),
              backgroundColor:'blue',
              width: rpx(400),
            }}
            inputStyle={{
            }}
            placeholder="请输入"
            ref={this.input}
            underlineColorAndroid="transparent"
          />
          <Button title='发送' onPress={this.onBtn}></Button>
        </View>
      </View>
    )
  }
}