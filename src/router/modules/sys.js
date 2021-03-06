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
      rootMenu: true,
      component: () => import('@/views/sys/user/index'),
      meta: { title: '用户管理', icon: 'user', parent: 'Sys' }
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
      component: () => import('@/views/sys/role/index'),
      meta: { title: '角色管理', icon: 'peoples', parent: 'Sys' }
    }
  ]
}

const dept = {
  path: '/sys/dept',
  component: Layout,
  redirect: '/sys/dept/list',
  name: 'Sys',
  children: [
    {
      path: 'list',
      name: 'dict',
      rootMenu: true,
      component: () => import('@/views/sys/dept/index'),
      meta: { title: '组织机构', icon: 'tree', parent: 'Sys' }
    }
  ]
}

const menu = {
  path: '/sys/menu',
  component: Layout,
  redirect: '/sys/menu/list',
  name: 'Sys',
  children: [
    {
      path: 'list',
      name: 'menu',
      rootMenu: true,
      component: () => import('@/views/sys/menu/index'),
      meta: { title: '菜单管理', icon: 'tree-table', parent: 'Sys' }
    }
  ]
}

const dict = {
  path: '/sys/dict',
  component: Layout,
  redirect: '/sys/dict/list',
  name: 'Sys',
  children: [
    {
      path: 'list',
      name: 'dict',
      rootMenu: true,
      component: () => import('@/views/sys/dict/index'),
      meta: { title: '字典管理', icon: 'education', parent: 'Sys' }
    }
  ]
}

export {
  user,
  role,
  dept,
  menu,
  dict
}
