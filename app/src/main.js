import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/theme.less' // 修改为 LESS 文件

const app = createApp(App);
app.use(router);
app.mount('#app');