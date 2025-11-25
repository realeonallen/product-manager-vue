import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials) {
      try {
        this.error = null
        const res = await axios.post('https://dummyjson.com/auth/login', credentials, { headers: { 'Content-Type': 'application/json' } })
        this.token = res.data.token
        this.user = res.data
        localStorage.setItem('auth', JSON.stringify({ token: this.token, user: this.user }))
        return res.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth')
    },
    restoreSession() {
      const raw = localStorage.getItem('auth')
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          this.token = parsed.token
          this.user = parsed.user
        } catch (e) {
          // ignore
        }
      }
    }
  }
})
