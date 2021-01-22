import axios from "axios"

const baseUrl = 'https://test.shop.81hbz.com'

let instance = axios.create({
  timeout: 1000 *10,
  responseType: 'json',
})

instance.interceptors.request.use(r => {
  // r.headers = {
  //   authorization: 
  // }
  return r
},)

instance.interceptors.response.use(res => {
  return res.data
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