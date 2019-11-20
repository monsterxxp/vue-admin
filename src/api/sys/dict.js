import request from '@/utils/request'

export function findDictCategoryList(params) {
  return request({
    url: '/sysDictCategory',
    method: 'get',
    params
  })
}

export function saveDictCategory(params) {
  return request({
    url: '/sysDictCategory',
    method: 'post',
    data: params
  })
}

export function findCategoryById(id) {
  return request({
    url: `/sysDictCategory/${id}`,
    method: 'get'
  })
}

export function updateCategory(params) {
  return request({
    url: `/sysDictCategory/${params.id}`,
    method: 'put',
    data: params
  })
}

export function bulkCategory(id) {
  return request({
    url: `/sysDictCategory/${id}/bulk`,
    method: 'delete'
  })
}

export function findDictList(params) {
  return request({
    url: '/sysDict',
    method: 'get',
    params
  })
}

export function saveDict(params) {
  return request({
    url: '/sysDict',
    method: 'post',
    data: params
  })
}

export function findDictById(id) {
  return request({
    url: `/sysDict/${id}`,
    method: 'get'
  })
}

export function findByCategoryCode(id) {
  return request({
    url: `/sysDict/${id}/findByCategoryCode`,
    method: 'get'
  })
}

export function updateDict(params) {
  return request({
    url: `/sysDict/${params.id}`,
    method: 'put',
    data: params
  })
}

export function bulkDict(id) {
  return request({
    url: `/sysDict/${id}/bulk`,
    method: 'delete'
  })
}
