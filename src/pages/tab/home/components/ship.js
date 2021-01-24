import React from 'react'
import { ActivityIndicator } from 'react-native'
import { View } from 'react-native'
import { MapView } from 'react-native-amap3d'
import { axiosGet } from '../../../../utils/axios'
import { rpx } from '../../../../utils/size'
import { ButtonGroup, Card, ListItem, Icon } from 'react-native-elements'
import { Alert } from 'react-native'
import { Linking } from 'react-native'

export default class Ship extends React.Component {

  state = {
    list: [],
    isLoaded: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    let d = {
      page: 1,
      type: 'noget',
      order_type: 'delivery'
    }
    axiosGet('store/order/index', d)
      .then(r => {
        this.list = r.data.result.data
      })
      .catch(e => {

      })
      .finally(_ => {
        this.setState({
          isLoaded: true
        })
      })
  }

  handleByInx = inx => {
    switch(inx) {
      case 0:
        Alert.alert(
          '温馨提示',
          '确定此订单完成配送?',
          [
            {
              text: '取消',
            },
            {
              text: '确定',
            }
          ],
        )
        break
      case 1:
        Linking.openURL('tel:10086')
        break
    }
  }

  render() {
    let { isLoaded } = this.state

    return isLoaded ? 
            <View style={{flex:1, width: rpx(750)}}>
              <MapView style={{flex: 1}} />
              
              <Card
                containerStyle={{
                  position: 'absolute',
                  bottom: rpx(30),
                  left: rpx(20),
                  right: rpx(20),
                  // width: rpx(710),
                }}
              >
                <ListItem containerStyle={{padding: 0}} pad={rpx(0)}>
                  <Icon name='phone' type='font-awesome' size={rpx(20)} />
                  <ListItem.Content>
                    <ListItem.Title>联系人</ListItem.Title>
                    <ListItem.Subtitle>洗洗</ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon name='phone' type='font-awesome' reverse reverseColor="red" size={rpx(20)} />
                </ListItem>
                <ListItem ontainerStyle={{padding: 0}} pad={rpx(0)}>
                  <Icon name='phone' type='font-awesome' size={rpx(20)} />
                  <ListItem.Content>
                    <ListItem.Title>地址</ListItem.Title>
                    <ListItem.Subtitle>洗洗</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron onPress={_ => console.log('哈哈')} />
                </ListItem>
                <Card.Divider />
                <ButtonGroup
                  buttons={['完成配送', '联系对方', '转单']}
                  onPress={this.handleByInx}
                />
              </Card>
            </View>
            : <ActivityIndicator color="red" size='large' />

    
  }

}