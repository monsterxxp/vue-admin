<template>
  <div>
    <div class="search">
      <el-input style="padding: 0 5px 0 0"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-button @click="create">
        <i class="el-icon-plus" title="新增字典分类" />
      </el-button>
    </div>
    <div class="category-name" :class="{'active': item.check}" v-for="item in list" :key="item.id" @click="checkItem(item)">
        <p >{{item.name}}</p>
        <div class="button-group">
          <i class="el-icon-search operation" title="查看" v-if="item.check" @click="view(item.id)" />
          <i class="el-icon-edit operation" v-if="item.isUpdate === '1' && item.check" title="修改" @click="edit(item.id)" />
          <i class="el-icon-delete operation" v-if="item.isUpdate === '1' && item.check" title="删除" @click="remove(item.id)"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      filterText: '',
      backupData: []
    }
  },
  watch: {
    filterText(val) {
      this.list = this.backupData.filter(item => item.name.indexOf(val) != -1)
    }
  },
  methods: {
    init(data) {
      this.list = data
      this.backupData = data
    },
    checkItem(item) {
      if (item.check) {
        return;
      }
      let temp = []
      this.list.forEach(e => {
        if (e.id === item.id) {
          e.check = true
        } else {
          e.check = false
        }
        temp.push(e)
      })
      this.list = temp
      this.$emit('checkItem', item)
    },
    create() {
      this.$emit('create')
    },
    edit(id) {
      this.$emit('edit', id)
    },
    remove(id) {
      this.$emit('remove',id)
    },
    view(id) {
      this.$emit('view', id)
    }
  }
}
</script>

<style scoped>
.category-name {
  cursor: pointer;
  margin-top: 5px;
  display: flex;
}
p {
  padding: 5px;
  margin: 0;
  font-size: 14px;
  color: #5e6166;
  font-weight: bold;
}
.button-group {
  color: #5e6166;
  flex:1;
  text-align:right;
  margin-top:5px;
}
.active {
  background: rgb(247, 242, 250);
  border-radius: 5px;
}
.search {
  display: flex;
}
</style>