<template>
  <div class="app-container">
    <div class="list-top">
      <div class="search-group">
        <el-input v-model="defaultSearch.params.name" class="search-input-out" prefix-icon="el-icon-search" placeholder="请输入名称按回车进行搜索..." @keyup.enter.native="fetchData" />
      </div>
      <div class="list-botton-group">
        <el-button @click="create">
          <i class="el-icon-plus" title="新增" />
        </el-button>
        <!-- <el-button @click="batchBulk">
                  <i class="el-icon-delete" title="批量删除" />
                </el-button> -->
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="selectChange"
      @sort-change="orderSort"
    >
      <el-table-column
        type="index"
        width="35"
      />
      <el-table-column align="center" label="菜单名称">
        <template slot-scope="scope">
          <span :title="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="菜单图标">
        <template slot-scope="scope">
          <span :title="scope.row.icon">{{ scope.row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="菜单代码">
        <template slot-scope="scope">
          <span :title="scope.row.code">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限代码">
        <template slot-scope="scope">
          <span :title="scope.row.authCode">{{ scope.row.authCode }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="菜单链接">
        <template slot-scope="scope">
          <span :title="scope.row.menuUrl">{{ scope.row.menuUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          <span :title="scope.row.sort">{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <i class="el-icon-edit operation" title="修改" @click="edit(scope.row.id)" />
          <i class="el-icon-delete operation" title="删除" @click="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :total="total"
      :page="page"
      :limit="limit"
      @pagination="pageSearch"
    />

    <form-dialog ref="formDialog" @search="fetchData" />
  </div>
</template>

<script>
import { getList, bulk } from '@/api/sys/SysMenu'
import Pagination from '@/components/Pagination'
import FormDialog from './dialog/FormDialog'

export default {
  components: {
    Pagination,
    FormDialog
  },
  data() {
    return {
      showSearchBox: false,
      list: [],
      total: 0,
      page: 0,
      limit: 0,
      listLoading: true,
      defaultSearch: {
        page: 1,
        limit: 20,
        params: {}
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.defaultSearch).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.page = response.data.current
        this.limit = response.data.size
        this.listLoading = false
      })
    },
    pageSearch(params) {
      if (params) {
        this.defaultSearch.page = params.page
        this.defaultSearch.limit = params.limit
      }
      this.fetchData()
    },
    orderSort(row) {
      this.defaultSearch.sortItem = row.prop
      this.defaultSearch.asc = row.order === 'ascending'
      this.fetchData()
    },
    clearSearch() {
      this.defaultSearch.params = {}
    },
    create() {
      this.$refs.formDialog.openDialog(false, null)
    },
    edit(id) {
      this.$refs.formDialog.openDialog(true, id)
    },
    openSearchBox() {
      this.$refs.searchBox.openDialog()
    },
    remove(id) {
      this.$confirm('是否删除该菜单表?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bulk(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      })
    }
  }
}
</script>
