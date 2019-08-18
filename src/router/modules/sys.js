/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const user = {
  path: '/sys/user',
  component: Layout,
  redirect: '/sys/user/list',
  name: 'Sys',
  children: [
    {
      path: 'list',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: { title: '用户', icon: 'table', parent: 'Sys' }
    }
  ]
}

const role = {
  path: '/sys/role',
  component: Layout,
  redirect: '/sys/user/list',
  name: 'Sys',
  children: [
    {
      path: 'list',
      name: 'role',
      component: () => import('@/views/role/index'),
      meta: { title: '角色', icon: 'table', parent: 'Sys' }
    }
  ]
}

export {
  user,
  role
}
