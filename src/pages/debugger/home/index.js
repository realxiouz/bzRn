import React from 'react'
import {View, Text} from 'react-native'
import { Button} from 'react-native-elements'

export default class Debugger extends React.Component {

  render() {
    let { navigation } = this.props
    return (
      <View>
        <Button title='news-home' onPress={ _ => navigation.navigate('NewsHome')} />
        <Button title='wechat' onPress={ _ => navigation.navigate('DebuggerWechat')} />
        <Button title='svg' onPress={ _ => navigation.navigate('DebuggerSvg')} />
      </View>
    )
  }
}