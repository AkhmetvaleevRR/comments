import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/styles.scss'

createApp(App).use(createPinia()).mount('#app')
