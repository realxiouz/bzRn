
import React from 'react'
import { View } from 'react-native'
import { Input, CheckBox, Button } from 'react-native-elements'
import { axiosPost } from '../../../utils/axios'
import { setObj, getObj } from '../../../utils/storage'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class LoginPage extends React.Component {

  state = {
    account: '18687910066',
    accountErrMsg: '',
    password: '',
    isPassword: true,
    isChecked: false
  }
  async componentDidMount() {
    let user = await getObj('user')
    console.log('user',user.userinfo)
  }

  onAccountChange = ({nativeEvent}) => {
    this.setState({
      account: nativeEvent.text
    })
    if (!/^1\d{10}$/.test(nativeEvent.text)) {
      this.setState({
        accountErrMsg: '输入正确的手机号码'
      })
    }
  }

  toggleType = _ => {
    this.setState({
      isPassword: !this.state.isPassword
    })
  }

  onLogin = async _ => {
    let d = new FormData()
    d.append('account', this.state.account)
    d.append('password', this.state.password)
    axiosPost('user/accountLogin',d)
      .then(r => {
        setObj('user', r.data.userinfo)
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    let { account, accountErrMsg, isPassword, isChecked } = this.state
    return (
      <View>
        <Input
          placeholder='输入电话'
          errorMessage={accountErrMsg}
          leftIcon={{ type: 'font-awesome', name: 'mobile' }}
          keyboardType='numeric'
          value={account}
          maxLength={11}
          onChange={this.onAccountChange}
        />
        <Input
          placeholder='输入密码'
          errorMessage='输入正确的手机号码'
          secureTextEntry={isPassword}
          rightIcon={{type: 'font-awesome', name: isPassword?'eye':'eye-slash', onPress: this.toggleType}}
          onChange={({nativeEvent}) => this.setState({password: nativeEvent.text})}
        />
        <CheckBox
          title='记住密码'
          checked={isChecked}
          onPress={_ => this.setState({isChecked: !this.state.isChecked})}
          style={{backgroundColor: 'transparent'}}
        />
        <Button
          title='登录'
          onPress={this.onLogin}
          // disabled={true}
          // loading={true}
        />
      </View>
    )
  }
} 