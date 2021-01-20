import React from 'react'
import { View, Text} from 'react-native'
import { Button } from 'react-native-elements'

export default class HomePage extends React.Component {

  render() {
    let { navigation } = this.props
    return (
      <View>
        <Text>homepage</Text>
        <Button title='news-home' onPress={ _ => navigation.navigate('NewsHome')} />
        <Button title='wechat' onPress={ _ => navigation.navigate('DebuggerWechat')} />
        <Button title='svg' onPress={ _ => navigation.navigate('DebuggerSvg')} />
      </View>
    )
  }
}