import { Dimensions } from 'react-native'

export function rpx(x = 0) {
  const w = Dimensions.get('window').width
  return x * w / 750
}