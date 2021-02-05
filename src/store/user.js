import { observable, action } from 'mobx'

class StoreUser {
  @observable
  token = ''

  @action
  setToken(token) {
    this.token = token
  }
}

export default new StoreUser()