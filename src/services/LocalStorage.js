const LocalStorage = () => {
  return {
    getItem(key) {
      return localStorage.getItem(key);
    },
    setItem(key, value) {
      localStorage.setItem(key, value);
    }
  };
};

export default LocalStorage();
