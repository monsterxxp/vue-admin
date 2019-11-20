import request from '@/utils/request'

export function login(data) {
  return request({
    url: `/login?username=${data.username}&password=${data.password}&rememberMe=${data.rememberMe}`,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
