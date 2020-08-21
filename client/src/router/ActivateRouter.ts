import { RouteConfig } from 'vue-router'
const ActivateRoutes: RouteConfig = {
  path: '/activate',
  name: 'Activate',
  component: () => import('@/views/activate/ActivatePage.vue')
}
export default ActivateRoutes
