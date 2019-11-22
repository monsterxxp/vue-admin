<template>
  <div >
    <el-select v-if="type === 'tree'" ref="treeSelect" :value="selectValue" placeholder="请选择" :clearable="clearValue" :multiple="multiple" @clear="clearHandle">
        <el-option
            class="tree-select"
            :label="selectValue"
            :value="selectValue">
            <el-tree 
                ref="tree"
                :data="content" 
                :props="defaultProps"
                :show-checkbox="multiple"
                :node-key="id"
                @check-change="handleCheckChange"
                :default-expanded-keys="defaultExpandedKey"
                @node-click="handleNodeClick">
            </el-tree>
        </el-option>
    </el-select>
    <el-select v-if="type === 'defalut'" @change="changeHandle" :value="selectValue" :clearable="clearValue" :multiple="multiple" @clear="clearHandle" placeholder="请选择">
    <el-option
      v-for="item in content"
      :key="item[id]"
      :label="item[label]"
      :value="item[id]">
    </el-option>
  </el-select>
  </div>
</template>

<script>

export default {
  props: {
    content:{
      type: Array,       
      default: ()=>{ return [] }
    },
    type: {
      type: String,       
      default: ()=>{ return 'defalut' }
    },
    value: {
      type: String,       
      default: ()=>{ return '' }
    },
    clearValue: {
      type: Boolean,       
      default: ()=>{ return false }
    },
    multiple: {
      type: Boolean,       
      default: ()=>{ return false } 
    },
    label: {
      type: String,       
      default: ()=>{ return 'name' } 
    },
    id: {
      type: String,       
      default: ()=>{ return 'id' } 
    },
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      defaultExpandedKey: [],
      treeId: this.value,
      selectValue: '',
      defaultProps: {
        children: 'children',
        label: this.label
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if (this.type === 'tree') {
        this.treeId = this.value
        this.initData()
      } else if (this.type === 'defalut') {
        this.content.forEach(e => {
          if (e.id === this.value) {
            this.selectValue = e.name
          }
        })
      }
    })
  },
  methods: {
    initData() {
      if(this.treeId){
        this.selectValue = this.$refs.tree.getNode(this.treeId)?this.$refs.tree.getNode(this.treeId).data[this.label]:''
        this.$refs.tree.setCurrentKey(this.treeId)
        this.defaultExpandedKey = [this.treeId]
      }
    },
    handleNodeClick(data) {
      if (!this.multiple) {
        this.selectValue = data.name
        this.$emit('change', data.id)
        this.$refs.treeSelect.blur()
      }
    },
    handleCheckChange(data) {
    },
    // 清除选中
    clearHandle(){
      if (this.type === 'tree') {
        this.selectValue = ''
        this.treeId = ''
        this.defaultExpandedKey = []
        this.clearSelected()
        this.$emit('change', '')
      } else if (this.type === 'defalut') {
        this.selectValue = ''
        this.$emit('change', '')
      }
    },
    /* 清空选中样式 */
    clearSelected(){
      if (this.type === 'tree') {
        let allNode = document.querySelectorAll('#tree-option .el-tree-node')
        allNode.forEach((element)=>element.classList.remove('is-current'))
      } 
    },
    changeHandle(val) {
      if (this.type === 'defalut') {
        this.content.forEach(e => {
          if (e.id === val) {
            this.selectValue = e.name
          }
        })
        this.$emit('change', val)
      }
    }
  }

}
</script>

<style scoped>
.el-select {
  width: 100%
}
.tree-select {
    min-height: 200px;
    background: #FFF;
    overflow-y:auto;
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
