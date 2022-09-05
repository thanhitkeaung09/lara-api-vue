import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "../views/RegisterView.vue"
import LoginView from "../views/LoginView.vue"
import DashboradView from '../views/DashboradView.vue'
import CreateView from '@/views/CreateView.vue'
import ProductListView from '@/views/ProductListView.vue'
import ShowInfoView from '@/views/ShowInfoView.vue'
import EditView from '@/views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboradView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/product-list',
      name: 'productList',
      component: ProductListView
    },
    {
      path: '/info',
      name: 'productShow',
      component: ShowInfoView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView,
      // props : true
    },

  ]
})

export default router
