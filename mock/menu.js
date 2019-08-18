// import Mock from 'mockjs'

const data = {
  'items': [{
    id: '1',
    code: 'Index',
    name: '控制台'
  }, {
    id: '2',
    code: 'Sys',
    name: '系统管理'
  }]
}

export default [
  {
    url: '/sys/menu',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
