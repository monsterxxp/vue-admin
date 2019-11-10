/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const user = {
  path: '/sys/user',
  component: Layout,
  redirect: '/sys/user/list',
  name: 'Sys',
  meta: { title: '用户管理', icon: 'table' },
  children: [
    {
      path: 'list',
      name: 'user',
      rootMenu: true,
      component: () => import('@/views/user/index'),
      meta: { title: '用户', icon: 'table', parent: 'Sys' }
    },
    {
      path: 'createUser',
      name: 'createUser',
      component: () => import('@/views/user/create/index'),
      meta: { title: '新增用户', icon: 'table', parent: 'Sys', activeMenu: '/sys/user/list' }
    }
  ]
}

const role = {
  path: '/sys/role',
  component: Layout,
  redirect: '/sys/role/list',
  name: 'Sys',
  children: [
    {
      path: 'list',
      name: 'role',
      rootMenu: true,
      component: () => import('@/views/role/index'),
      meta: { title: '角色', icon: 'table', parent: 'Sys' }
    }
  ]
}

export {
  user,
  role
}
