import { NewRound, User } from '@/object'

export const useGameStore = defineStore('game', {
  state: () => ({
    user: new User(),
    newRound: new NewRound(),
  }),
  getters: {},
  actions: {
    updateUser(payload: User) {
      this.user = payload
    },
    updateNewRound(payload: NewRound) {
      this.newRound = payload
    },
  },
})
