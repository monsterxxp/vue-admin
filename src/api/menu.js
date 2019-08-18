import request from '@/utils/request'

export function findRootMenus() {
  return request({
    url: '/sys/menu',
    method: 'get'
  })
}
