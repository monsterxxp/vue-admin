<template>
  <div class="nav-menu-container">
    <ul>
      <li v-for="rootMenu in rootMenus" :key="rootMenu.id" @click="activeMenu(rootMenu.code)" :class="currentRootMenu === rootMenu.code ? 'active': ''">{{rootMenu.name}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    currentRootMenu() {
      return this.$store.state.menu.currentRootMenu
    },
    rootMenus() {
      return this.$store.state.user.rootMenus
    },
  },
  methods: {
    activeMenu (rootMenuName) {
      this.$store.dispatch('menu/getSubMenus', rootMenuName)
      this.$router.push({ name: rootMenuName })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu-container {
  color: #fff;
  margin-left: 20px;
  font-weight: bold;
  display: inline-block;
  font-size: 15px;
  height: 50px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 50px;
    display: table-cell;
    vertical-align: middle;
  }
  li {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    padding: 7px 20px;
  }
  .active {
    background-color: #1d5089;
    border-radius: 20px; 
  }
}
</style>
