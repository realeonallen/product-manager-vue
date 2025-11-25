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
        // If the remote API rejects (e.g. DummyJSON invalid credentials)
        // provide a local dev fallback so the app can be tried on localhost.
        this.error = err.response?.data?.message || err.message
        // Allow enabling the dev fallback explicitly via Vite env var
        // Set `VITE_DEV_AUTH_FALLBACK=true` in a .env file to enable regardless of hostname.
        const envFallback = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DEV_AUTH_FALLBACK === 'true'
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || envFallback)
        if (isLocal && (err.response?.status === 400 || err.response?.status === 401)) {
          // Create a fake session for development/demo purposes only
          const fake = {
            token: 'local-dev-token',
            id: 0,
            username: credentials.username || 'demo',
            firstName: 'Local',
            lastName: 'Demo'
          }
          this.token = fake.token
          this.user = fake
          localStorage.setItem('auth', JSON.stringify({ token: this.token, user: this.user }))
          return fake
        }
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
