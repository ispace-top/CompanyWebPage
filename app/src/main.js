import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 1. 导入路由

const app = createApp(App)

app.use(router) // 2. 在应用实例上注册路由

app.mount('#app') // 3. 挂载应用