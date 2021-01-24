import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getObj(key) {
  let str = await AsyncStorage.getItem(key)
  return str ? JSON.parse(str) : {}
}

export async function setObj(key, obj) {
  await AsyncStorage.setItem(key, JSON.stringify(obj))
}