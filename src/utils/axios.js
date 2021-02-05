import axios from "axios"
import {ToastAndroid} from 'react-native'
import { getObj } from '../utils/storage'

// const baseUrl = 'https://test.shop.81hbz.com'
const baseUrl = 'https://yunnanxinzijia.com/api/shop'
let user = {}

getObj('user')
  .then(r => {
    user = r
  })
  .catch(e => {

  })

let instance = axios.create({
  timeout: 1000 *10,
  // responseType: 'json',
})

instance.interceptors.request.use(r => {
  r.headers = {
    platform: 'wxMiniProgram',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  user.token && (r.headers.token = user.token)
  return r
},)

instance.interceptors.response.use(r => {
  let { status, data} = r
  switch(status) {
    case 200:
      if (data.code == 1 || data.code == 1000) {
        return data
      } else {
        ToastAndroid.show(data.msg, 2000)
        return Promise.reject(data)
      }
    default:
      ToastAndroid.show(data.msg, 'status 异常')
      return Promise.reject(data)
  }
}, e => {
  return Promise.reject(e)
})

function getUrl(path) {
  if (path.startsWith('http')) {
    return path
  }

  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
}

export function axiosGet(url, params={}) {
  return instance.get(getUrl(url), {
    params,
  })
}

export function axiosPost(url, data) {
  return instance.post(getUrl(url), data)
}

export default instance