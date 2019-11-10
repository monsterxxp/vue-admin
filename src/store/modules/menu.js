import router from '@/router'

const state = {
  subMenus: router.options.routes,
  currentRootMenu: ''
}

const mutations = {
  GET_SUB_MENU: (state, rootMenuName) => {
    const routes = JSON.parse(JSON.stringify(router.options.routes))
    const subMenus = routes.filter(route => route.name === rootMenuName)
    subMenus.forEach(sub => {
      if (sub.children) {
        sub.children = sub.children.filter(route => route.rootMenu === true)
      }
    })
    state.subMenus = subMenus
    state.currentRootMenu = rootMenuName
  }
}

const actions = {
  getSubMenus({ commit }, rootMenuName) {
    commit('GET_SUB_MENU', rootMenuName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
