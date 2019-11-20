<template>
  <el-dialog
    :visible.sync="open"
    width="60%">
    <slot/>
    <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-refresh" @click="clearSearch">重 置</el-button>
      <el-button icon="el-icon-search" type="primary"  @click="search">搜 索</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    }
  },
  methods: {
    openDialog() {
      this.open = true
    },
    search () {
      this.$emit('search')
      this.open = false
    },
    clearSearch () {
      this.$emit('clearSearch')
    }
  }
}
</script>

<style scoped>

</style>
