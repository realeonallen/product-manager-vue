<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold" style="color: #000080">Product Manager</h1>
        <p class="text-gray-600 text-sm mt-1">Sign in to your account</p>
      </div>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
          <input v-model="username" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="kminchelle" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <input v-model="password" type="password" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="0lelplR" />
        </div>
        <div v-if="error" class="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{{ error }}</div>
        <button :disabled="loading" :class="loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'" class="w-full text-white px-4 py-2 rounded-lg font-semibold transition" style="background-color: #000080">{{ loading ? 'Signing in...' : 'Sign In' }}</button>
      </form>
      <p class="text-center text-xs text-gray-500 mt-6">Demo credentials: kminchelle / 0lelplR</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('kminchelle')
const password = ref('0lelplR')
const loading = ref(false)
const error = ref(null)

const onSubmit = async () => {
  loading.value = true
  error.value = null
  try {
    await auth.login({ username: username.value, password: password.value })
    router.push({ name: 'Products' })
  } catch (err) {
    error.value = auth.error || 'Login failed. Check credentials.'
  } finally {
    loading.value = false
  }
}

// restore session on mount
onMounted(() => {
  auth.restoreSession()
  if (auth.isAuthenticated) {
    router.push({ name: 'Products' })
  }
})
</script>
