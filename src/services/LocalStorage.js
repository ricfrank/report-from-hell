const LocalStorage = () => {
  return {
    getItem(key) {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key)
      }
    },
    setItem(key, value) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value)
      }
    }
  }
}

export default LocalStorage()
