const KEY = 'USER_TOKEN'

export function setUserToken(token: string) {
  localStorage.setItem(KEY, token)
}

export function getUserToken() {
  return localStorage.getItem(KEY)
}

export function removeUserToken() {
  localStorage.removeItem(KEY)
}
