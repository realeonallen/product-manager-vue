<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold" style="color: #000080">Products</h1>
        <button @click="logout" class="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">Logout</button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- Search & Actions Bar -->
      <div class="flex items-center justify-between gap-4 mb-6">
        <div class="flex items-center gap-2 flex-1">
          <input v-model="query" placeholder="Search products by title..." class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" />
          <button @click="fetch" class="px-4 py-2 text-white rounded-lg font-medium transition hover:opacity-90" style="background-color: #000080">Refresh</button>
        </div>
        <router-link to="/products/new" class="px-4 py-2 text-white rounded-lg font-medium transition hover:opacity-90" style="background-color: #000080">+ Add Product</router-link>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin">⏳</div>
          <p class="text-gray-600 mt-2">Loading products...</p>
        </div>

        <div v-else-if="filtered.length === 0" class="p-12 text-center text-gray-500">
          No products found. Try adjusting your search.
        </div>

        <table v-else class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="text-left px-6 py-3 font-semibold text-gray-700">Product</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-700">Category</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-700">Price</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-700">Stock</th>
              <th class="text-center px-6 py-3 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="p in filtered" :key="p.id" class="hover:bg-blue-50 transition">
              <td class="px-6 py-4">
                <div class="flex items-start gap-3">
                  <img :src="p.thumbnail" :alt="p.title" class="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <div class="font-medium text-gray-900">{{ p.title }}</div>
                    <div class="text-sm text-gray-500 line-clamp-2">{{ truncate(p.description) }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-700 capitalize">{{ p.category }}</td>
              <td class="px-6 py-4 font-semibold text-gray-900">${{ p.price.toFixed(2) }}</td>
              <td class="px-6 py-4">
                <span :class="p.stock > 10 ? 'bg-green-100 text-green-800' : p.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ p.stock }} in stock
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <router-link :to="{ name: 'ProductView', params: { id: p.id } }" class="text-sm font-medium px-3 py-1 rounded transition" style="color: #000080">
                  View
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const store = useProductStore()
const query = ref('')

const fetch = async () => {
  await store.fetchProducts()
}

onMounted(() => {
  fetch()
})

const filtered = computed(() => {
  if (!query.value) return store.products
  const q = query.value.toLowerCase()
  return store.products.filter(p => p.title.toLowerCase().includes(q))
})

const truncate = (s) => {
  if (!s) return ''
  return s.length > 100 ? s.slice(0, 100) + '…' : s
}

const loading = computed(() => store.isLoading)

const logout = () => {
  auth.logout()
  router.push({ name: 'Login' })
}
</script>
