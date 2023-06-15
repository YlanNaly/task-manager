const useLocalStorage = (key:any , value :any) => {
  const storeItem = localStorage.getItem(key);
  let parsedValue = storeItem ? JSON.parse(storeItem) : value;
  
  const setValue = (newValue:any) => {
    parsedValue = newValue;
    localStorage.setItem(key, JSON.stringify(newValue));
  };
}

export {
  useLocalStorage
}