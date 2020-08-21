import { RouteConfig } from 'vue-router'
const LoginRoutes: RouteConfig = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/LoginPage.vue')
}
export default LoginRoutes
