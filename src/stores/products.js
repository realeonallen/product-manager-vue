import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

const API_BASE = 'https://dummyjson.com'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null
  }),
  actions: {
    getAuthHeaders() {
      const auth = useAuthStore()
      return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
    },
    async fetchProducts() {
      try {
        this.isLoading = true
        this.error = null
        const res = await axios.get(`${API_BASE}/products?limit=100`, { headers: this.getAuthHeaders() })
        this.products = res.data.products || []
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    async fetchProductById(id) {
      try {
        this.isLoading = true
        this.error = null
        const res = await axios.get(`${API_BASE}/products/${id}`, { headers: this.getAuthHeaders() })
        return res.data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.isLoading = false
      }
    },
    async addProduct(payload) {
      try {
        this.isLoading = true
        this.error = null
        const res = await axios.post(`${API_BASE}/products/add`, payload, { headers: this.getAuthHeaders() })
        // API returns created product
        if (res.data) this.products.unshift(res.data)
        return res.data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.isLoading = false
      }
    },
    async deleteProduct(id) {
      try {
        this.isLoading = true
        this.error = null
        const res = await axios.delete(`${API_BASE}/products/${id}`, { headers: this.getAuthHeaders() })
        // On dummyjson, delete returns object; update local list
        this.products = this.products.filter(p => p.id !== id)
        return res.data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.isLoading = false
      }
    }
  }
})
