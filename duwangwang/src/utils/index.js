export const setStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export const getStorage = (key) => {
  let value = window.localStorage.getItem(key)
  return JSON.parse(value)
}
export const removeStorage = (key) => {
  window.localStorage.removeItem(key)
}