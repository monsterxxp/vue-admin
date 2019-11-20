import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/user',
    method: 'post',
    data: params
  })
}

export function findDTOById(id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}

export function update(params) {
  return request({
    url: `/user/${params.id}`,
    method: 'put',
    data: params
  })
}

export function bulk(id) {
  return request({
    url: `/user/${id}/bulk`,
    method: 'delete'
  })
}

export function resetPwd(params) {
  return request({
    url: `/user/${params.id}/resetPwd`,
    method: 'put',
    data: params
  })
}

export function batchBulk(params) {
  return request({
    url: `/user/batchBulk`,
    method: 'delete',
    data: params
  })
}
