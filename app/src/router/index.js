import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue'; 
import Setup from '../views/Setup.vue';

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: '企业首页' } },
  { path: '/admin', name: 'Admin', component: Admin, meta: { title: '管理后台' } },
  { path: '/setup', name: 'Setup', component: Setup, meta: { title: '初始化设置' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局前置守卫：检查初始化状态
router.beforeEach(async (to, from, next) => {
  try {
    console.log(`[路由守卫] 开始检查初始化状态`);
    
    // 添加超时处理
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('请求超时')), 5000)
    );
    
    const response = await Promise.race([
      axios.get('/api/check-initialized'),
      timeoutPromise
    ]);
    
    const isInitialized = response.data.initialized;
    console.log(`[路由守卫] 初始化状态: ${isInitialized}`);
    
    if (!isInitialized) {
      console.log(`[路由守卫] 未初始化，检查访问权限`);
      if (to.path !== '/setup') {
        console.log(`[路由守卫] 重定向到 /setup`);
        next('/setup');
      } else {
        next();
      }
    } else {
      if (to.path === '/setup') {
        console.log(`[路由守卫] 已初始化，禁止访问/setup，重定向到首页`);
        next('/');
      } else {
        next();
      }
    }
  } catch (error) {
    console.error('[路由守卫] 初始化检查失败:', error.message);
    // 超时或错误时跳转到错误页面
    next('/error?code=INIT_CHECK_FAIL');
  }
});

// 新增：全局后置守卫，动态设置页面标题
router.afterEach((to) => {
  document.title = to.meta.title || '企业官网'; // 使用路由元信息标题，无则用默认
});

export default router;