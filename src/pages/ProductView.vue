<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button @click="$router.back()" class="text-sm px-3 py-1 rounded hover:bg-gray-100" style="color: #000080">← Back</button>
        <button @click="logout" class="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">Logout</button>
      </div>
    </div>

    <!-- Product Detail -->
    <div class="max-w-4xl mx-auto px-6 py-6">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin">⏳</div>
        <p class="text-gray-600 mt-2">Loading product details...</p>
      </div>

      <div v-else-if="product" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid md:grid-cols-2 gap-8 p-8">
          <!-- Image -->
          <div class="flex items-center justify-center">
            <img :src="product.thumbnail" :alt="product.title" class="w-full max-w-md rounded-lg object-cover" />
          </div>

          <!-- Details -->
          <div>
            <h2 class="text-3xl font-bold mb-2" style="color: #000080">{{ product.title }}</h2>
            <p class="text-gray-600 text-lg mb-6">{{ product.description }}</p>

            <div class="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="text-sm text-gray-600">Category</p>
                <p class="font-semibold text-gray-900 capitalize">{{ product.category }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Price</p>
                <p class="font-semibold text-gray-900">${{ product.price.toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Stock</p>
                <p class="font-semibold text-gray-900">{{ product.stock }} units</p>
              </div>
              <div v-if="product.rating">
                <p class="text-sm text-gray-600">Rating</p>
                <p class="font-semibold text-gray-900">⭐ {{ product.rating }}</p>
              </div>
            </div>

            <div v-if="product.discountPercentage" class="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p class="text-sm text-amber-800">🏷️ Discount: <span class="font-semibold">{{ product.discountPercentage }}% off</span></p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3">
              <button @click="onDelete" :disabled="deleting" :class="deleting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'" class="px-6 py-2 bg-red-600 text-white rounded-lg font-medium transition">
                {{ deleting ? 'Deleting...' : 'Delete Product' }}
              </button>
              <router-link :to="{ name: 'Products' }" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                Back to List
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">Product not found.</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const store = useProductStore()
const product = ref(null)
const loading = ref(false)
const deleting = ref(false)

const load = async () => {
  loading.value = true
  const id = route.params.id
  try {
    // Try to find locally first
    const local = store.products.find(p => String(p.id) === String(id))
    if (local) {
      product.value = local
      loading.value = false
      return
    }
    const res = await store.fetchProductById(id)
    product.value = res
  } catch (err) {
    // ignore
  } finally {
    loading.value = false
  }
}

onMounted(() => load())

const onDelete = async () => {
  if (!confirm('Are you sure you want to delete this product?')) return
  deleting.value = true
  try {
    await store.deleteProduct(product.value.id)
    router.push({ name: 'Products' })
  } catch (err) {
    alert('Delete failed: ' + err.message)
    deleting.value = false
  }
}

const logout = () => {
  auth.logout()
  router.push({ name: 'Login' })
}
</script>
