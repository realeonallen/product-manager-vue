<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold" style="color: #000080">Add New Product</h1>
        <button @click="logout" class="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">Logout</button>
      </div>
    </div>

    <!-- Form -->
    <div class="max-w-4xl mx-auto px-6 py-6">
      <form @submit.prevent="onSubmit" class="bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Title <span class="text-red-500">*</span></label>
            <input v-model="form.title" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Product name" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <input v-model="form.category" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="e.g., electronics" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea v-model="form.description" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Detailed product description" rows="4"></textarea>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Price</label>
            <input v-model.number="form.price" type="number" step="0.01" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="0.00" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
            <input v-model.number="form.stock" type="number" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="0" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
            <input v-model.number="form.discountPercentage" type="number" step="0.01" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="0" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Thumbnail URL</label>
          <input v-model="form.thumbnail" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="https://..." />
        </div>

        <div v-if="error" class="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{{ error }}</div>

        <div class="flex items-center justify-between pt-4">
          <router-link :to="{ name: 'Products' }" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
            Cancel
          </router-link>
          <button :disabled="loading" :class="loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'" class="px-6 py-2 text-white rounded-lg font-medium transition" style="background-color: #000080">
            {{ loading ? 'Creating...' : 'Create Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const store = useProductStore()
const loading = ref(false)
const error = ref(null)

const form = reactive({ 
  title: '', 
  description: '', 
  category: '', 
  price: 0, 
  stock: 0, 
  thumbnail: '',
  discountPercentage: 0
})

const onSubmit = async () => {
  if (!form.title.trim()) {
    error.value = 'Title is required'
    return
  }
  loading.value = true
  error.value = null
  try {
    const created = await store.addProduct(form)
    router.push({ name: 'ProductView', params: { id: created.id } })
  } catch (err) {
    error.value = 'Failed to create product: ' + err.message
  } finally {
    loading.value = false
  }
}

const logout = () => {
  auth.logout()
  router.push({ name: 'Login' })
}
</script>
