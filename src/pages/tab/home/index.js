import React from 'react'
import { View, Text} from 'react-native'
import { Button, ButtonGroup } from 'react-native-elements'
import List from './components/order-list'
import Ship from './components/ship'

export default class HomePage extends React.Component {

  state = {
    selInx: 0
  }

  toggleInx = selInx => {
    this.setState({selInx})
  }



  render() {
    let { navigation } = this.props
    let { selInx } = this.state
    return (
      <View style={{flex:1}}>
        {/* <Text>homepage</Text>
        <Button title='news-home' onPress={ _ => navigation.navigate('NewsHome')} />
        <Button title='wechat' onPress={ _ => navigation.navigate('DebuggerWechat')} />
        <Button title='svg' onPress={ _ => navigation.navigate('DebuggerSvg')} /> */}

        <ButtonGroup
          buttons={['正在配送', '预约订单', '实时订单']}
          selectedIndex={selInx}
          onPress={this.toggleInx}
        />
        {
          selInx == 0 ? 
            <Ship /> : 
            selInx == 1 ? 
              <List key={0} type={0} style={{flex:1}}/> :
              <List key={1} type={1} style={{flex:1}} />
        }
      </View>
    )
  }
}