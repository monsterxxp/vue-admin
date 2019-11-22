import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sysMenu',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/sysMenu',
    method: 'post',
    data: params
  })
}

export function findDTOById(id) {
  return request({
    url: `/sysMenu/${id}`,
    method: 'get'
  })
}

export function update(params) {
  return request({
    url: `/sysMenu/${params.id}`,
    method: 'put',
    data: params
  })
}

export function bulk(id) {
  return request({
    url: `/sysMenu/${id}/bulk`,
    method: 'delete'
  })
}
