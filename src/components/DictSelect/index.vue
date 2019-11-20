<template>
  <div>
  <el-select :value="name" placeholder="请选择" @visible-change="getDict" @change="selectChange">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.code"
      />
    </el-select>
  </div>
</template>

<script>
import { findByCategoryCode } from '@/api/sys/dict'

export default {
  props: ['content', 'value'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      options: []
    }
  },
  methods: {
    getDict(open) {
      
    },
    selectChange(val) {
      this.$emit('change', val)
    }
  },
  computed: {
    name() {
      if (this.options.length === 0) {
        findByCategoryCode(this.content).then(response => {
          this.options = response.data
        }) 
      }
      let name;
      this.options.forEach(option => {
        if (option.code === this.value) {
          name = option.name
        }
      })
      return name
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%
}
</style>
