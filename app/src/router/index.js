import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Setup from '../views/Setup.vue';
import ErrorPage from '../views/Error.vue'; // 重命名导入

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home, 
    meta: { title: '企业首页' }
  },
  { 
    path: '/admin', 
    name: 'Admin', 
    component: Admin, 
    meta: { title: '管理后台' } 
  },
  { 
    path: '/setup', 
    name: 'Setup', 
    component: Setup, 
    meta: { title: '初始化设置' } 
  },
  { 
    path: '/error', 
    name: 'Error', 
    component: ErrorPage, // 使用重命名后的组件
    meta: { title: '出错啦！' } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局前置守卫：检查初始化状态
router.beforeEach(async (to, from, next) => {
  console.log('[路由守卫] 进入全局前置守卫', to.path);
  
  // 添加：排除错误页面本身的路由守卫检查
  if (to.path === '/error') {
    return next();
  }

  try {
    console.info(`[路由守卫] 开始检查初始化状态`);
    
    // 添加：最大重试次数限制
    const MAX_RETRIES = 3;
    let retryCount = 0;
    let isInitialized = false;
    
    while (retryCount < MAX_RETRIES && !isInitialized) {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('请求超时')), 3000) // 现在 Error 可用
        );

        const response = await Promise.race([
          axios.get('/api/check-initialized'),
          timeoutPromise
        ]);

        isInitialized = response.data.initialized;
        console.info(`[路由守卫] 初始化状态: ${isInitialized}`);
        break; // 成功获取状态，跳出循环
      } catch (error) {
        retryCount++;
        console.warn(`[路由守卫] 检查失败 (尝试 ${retryCount}/${MAX_RETRIES}): ${error.message}`);
        
        if (retryCount >= MAX_RETRIES) {
          console.error('[路由守卫] 达到最大重试次数，跳转到错误页面');
          return next('/error?code=INIT_CHECK_FAIL');
        }
        
        // 添加指数退避策略
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
      }
    }

    if (!isInitialized) {
      console.info(`[路由守卫] 未初始化，检查访问权限`);
      if (to.path !== '/setup') {
        next('/setup');
      } else {
        next();
      }
    } else {
      if (to.path === '/setup') {
        console.info(`[路由守卫] 已初始化，禁止访问/setup，重定向到首页`);
        next('/');
      } else {
        next();
      }
    }
  } catch (error) {
    console.error('[路由守卫] 错误详情:', error);
    // 添加：更详细的错误信息传递
    next(`/error?code=INIT_CHECK_FAIL&message=${encodeURIComponent(error.message)}`);
  }
});

router.afterEach((to) => {
  console.log('[路由守卫] 设置页面标题:', to.meta.title); // 添加日志
  document.title = to.meta.title || '企业官网'; // 修正默认标题
});

export default router;