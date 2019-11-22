<template>
  <div class="app-container">
    <div class="list-top">
      <div class="search-group">
        <el-input v-model="defaultSearch.params.name" class="search-input-out" prefix-icon="el-icon-search" placeholder="请输入部门名称按回车进行搜索..." @keyup.enter.native="fetchData" />
      </div>
      <div class="list-botton-group">
        <el-button @click="create">
          <i class="el-icon-plus" title="新增" />
        </el-button>
      </div>
    </div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column label="组织名称">
        <template slot-scope="scope">
          <span :title="scope.row.data.name">{{ scope.row.data.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组织代号" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.data.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.data.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.data.createdTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <i class="el-icon-edit operation" title="修改" @click="edit(scope.row.id)" />
          <i class="el-icon-plus operation" title="新增" @click="createSub(scope.row.id)" />
          <i class="el-icon-delete operation" title="删除" @click="remove(scope.row.id)"/>
        </template>
      </el-table-column>
    </el-table>

    <dept-create ref="deptCreate" @search="fetchData"/>
  </div>
</template>

<script>
import { getTree, bulk, update, resetPwd, batchBulk } from '@/api/sys/dept'
import Pagination from '@/components/Pagination'
import DeptCreate from './dialog/DeptCreate'

export default {
  components: {
    Pagination,
    DeptCreate
  },
  data() {
    return {
      list: [],
      listLoading: true,
      filterText: '',
      defaultSearch: {
        page: 1,
        limit: 20,
        params: {}
      },
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTree(this.defaultSearch).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    create() {
      this.$refs.deptCreate.openDialog(false, null, null)
    },
    createSub(parentId) {
      this.$refs.deptCreate.openDialog(false, null, parentId)
    },
    edit(id) {
      this.$refs.deptCreate.openDialog(true, id, null)
    },
    remove (id) {
      this.$confirm('是否删除该部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bulk(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData()
        })
      })
    },
  }
}
</script>
