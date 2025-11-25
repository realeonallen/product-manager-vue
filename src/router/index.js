import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Products from '../pages/Products.vue'
import ProductView from '../pages/ProductView.vue'
import AddProduct from '../pages/AddProduct.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', redirect: '/products' },
  { path: '/products', name: 'Products', component: Products, meta: { requiresAuth: true } },
  { path: '/products/new', name: 'AddProduct', component: AddProduct, meta: { requiresAuth: true } },
  { path: '/products/:id', name: 'ProductView', component: ProductView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const loggedIn = auth.isAuthenticated
  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: 'Login' })
  }
  if (to.name === 'Login' && loggedIn) {
    return next({ name: 'Products' })
  }
  next()
})

export default router
