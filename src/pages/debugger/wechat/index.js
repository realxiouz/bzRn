import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import * as wechat from 'react-native-wechat'

export default class Wechat extends React.Component {

  componentDidMount() {
    wechat.registerApp('wx817f2c6fc1bbb8fe')
  }

  checkWechat = _ => {
    wechat.isWXAppInstalled()
      .then(r => {
        alert(r)
      })
  }

  wechatAuth = _ => {
    wechat.sendAuthRequest('snsapi_userinfo')
      .then(r => {
        console.log(r)
        alert(r)
      })
      .catch(e => {
        console.log(e)
        alert(e)
      })
  }

  render() {
    return (
      <View>
        <Button title="isWechatInstall" onPress={this.checkWechat}/>
        <Button title="auth" onPress={this.wechatAuth} />
      </View>
    )
  }
}