import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sysDept',
    method: 'get',
    params
  })
}

export function getTree(params) {
  return request({
    url: '/sysDept/tree',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/sysDept',
    method: 'post',
    data: params
  })
}

export function findDTOById(id) {
  return request({
    url: `/sysDept/${id}`,
    method: 'get'
  })
}

export function update(params) {
  return request({
    url: `/sysDept/${params.id}`,
    method: 'put',
    data: params
  })
}

export function bulk(id) {
  return request({
    url: `/sysDept/${id}/bulk`,
    method: 'delete'
  })
}
