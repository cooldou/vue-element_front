const prefix = `risk_management/${window.__APP_EDITION__.toLowerCase()}/`

function keyWithPrefix(key) {
  return prefix + key
}

function parse(value) {
  try {
    return JSON.parse(value).value
  } catch (e) {
    return null
  }
}

function stringify(value) {
  return JSON.stringify({
    value: value
  })
}

export default {
  get(key) {
    return parse(sessionStorage.getItem(keyWithPrefix(key)))
  },

  set(key, value) {
    return sessionStorage.setItem(keyWithPrefix(key), stringify(value))
  },

  remove(key) {
    return sessionStorage.removeItem(keyWithPrefix(key))
  },

  getLocal(key) {
    return parse(localStorage.getItem(keyWithPrefix(key)))
  },

  setLocal(key, value) {
    return localStorage.setItem(keyWithPrefix(key), stringify(value))
  },

  removeLocal(key) {
    return localStorage.removeItem(keyWithPrefix(key))
  },

  getIsRedirect () {
    return sessionStorage.getItem('isRedirect') ? JSON.parse(sessionStorage.getItem('isRedirect')) : false
  },

  getIsBackstage () {
    return sessionStorage.getItem('isBackstage') ? JSON.parse(sessionStorage.getItem('isBackstage')) : false
  },
  getIsManagement () {
    return sessionStorage.getItem('isManagement') ? JSON.parse(sessionStorage.getItem('isManagement')) : false
  },

  getRedirectNickName () {
    return sessionStorage.getItem('redirectNickName') ? decodeURIComponent(sessionStorage.getItem('redirectNickName')) : null
  },

  clear() {
    sessionStorage.clear()
  }
}
