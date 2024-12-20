import localforage from 'localforage'

const appStorage = localforage.createInstance({
  name: 'app',
  driver: localforage.LOCALSTORAGE,
})

const userStorage = localforage.createInstance({
  name: 'user',
  driver: localforage.LOCALSTORAGE,
})

const db = localforage.createInstance({
  name: 'db',
})

userStorage.getItem('adf')

export { appStorage, userStorage, db }
