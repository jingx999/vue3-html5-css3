import { createRouter, createWebHistory } from 'vue-router'

// 引入页面组件
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import OrderView from '../views/OrderView.vue'
import SettingsView from '../views/SettingsView.vue'

// 创建路由实例并且定义路由规则
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/', name: 'Home', component: HomeView},
    {path:'/user', name:'User', component:UserView},
    {path:'/order', name:'Order', component:OrderView},
    {path:'/settings', name:'Settings', component:SettingsView}
  ],
})

export default router
