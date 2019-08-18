import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://127.0.0.1:8080/user',
    method: 'get',
    params
  })
}
