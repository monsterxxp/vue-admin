import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sysRole',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/sysRole',
    method: 'post',
    data: params
  })
}

export function findDTOById(id) {
  return request({
    url: `/sysRole/${id}`,
    method: 'get'
  })
}

export function update(params) {
  return request({
    url: `/sysRole/${params.id}`,
    method: 'put',
    data: params
  })
}

export function bulk(id) {
  return request({
    url: `/sysRole/${id}/bulk`,
    method: 'delete'
  })
}
