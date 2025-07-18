import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Suivi from './views/Suivi.vue'
import './style.css'


const routes = [
  { path: '/', component: Home },
  { path: '/suivi', component: Suivi }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


createApp(App).use(router).mount('#app')
