/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const dashboard = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Index',
  children: [{
    path: 'dashboard',
    name: 'dashboard',
    rootMenu: true,
    component: () => import('@/views/dashboard/index'),
    meta: { title: '首页', icon: 'dashboard', parent: 'Index' }
  }]
}

export {
  dashboard
}
