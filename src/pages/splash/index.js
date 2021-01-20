import React from "react";
import {View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { rpx } from "../../utils/size";

class SplashPage extends React.Component {

  state = {
    txt: '跳过 5',
    tId: null,
  }

  componentDidMount() {
    let countDown = 5
    this.state.tId = setInterval(_ => {
      countDown--
      this.setState({
        txt: `跳过 ${countDown}`
      })
      if (countDown<=0) {
        clearInterval(this.state.tId)
        this.state.tId = null
        this.goHome()
      }
    }, 1000)
  }

  goHome= _ => {
    this.state.tId && clearInterval(this.state.tId)
    this.props.navigation.replace('Home')
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={!!0} backgroundColor='transparent' translucent={true} />
        <Image style={this.styles.bg} source={{uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F17%2F20181217224401_twtgy.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612600688&t=329b3381a7db03be9a70d527118339ae'}} />
        <Text style={this.styles.btn} onPress= {this.goHome}>{this.state.txt}</Text>
      </View>
    )
  }

  styles = StyleSheet.create({
    bg: {
      resizeMode: 'cover',
      width: '100%',
      height: '100%'
    },
    btn: {
      position:'absolute',
      bottom: rpx(100),
      right: rpx(100),
      height: rpx(60),
      width: rpx(160),
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: rpx(30),
      backgroundColor: 'transparent',
      textAlign:'center',
      textAlignVertical: 'center',
    }
  })
}

export default SplashPage
