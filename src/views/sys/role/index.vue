<template>
  <div class="app-container">
    <div class="list-top">
      <div class="search-group">
        <el-input v-model="defaultSearch.params.name" class="search-input-out" prefix-icon="el-icon-search" placeholder="请输入姓名或者账号按回车进行搜索..." @keyup.enter.native="fetchData" />
        <el-button circle @click="openSearchBox">
          <i class="el-icon-caret-bottom" title="查询更多" />
        </el-button>
      </div>
      <search-box ref="searchBox" @search="fetchData" @clearSearch="clearSearch">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="6"><label class="search-label">姓名</label></el-col>
              <el-col class="search-item-cell" :span="18"><el-input placeholder="请输入姓名" v-model="defaultSearch.params.name"></el-input></el-col>
            </el-row >
          </el-col>
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="6"><label class="search-label" for="test1">姓名</label></el-col>
              <el-col :span="18"><el-input placeholder="请输入姓名" v-model="defaultSearch.params.name"></el-input></el-col>
            </el-row >
          </el-col>
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="6"><label class="search-label" for="test1">姓名</label></el-col>
              <el-col :span="18"><el-input placeholder="请输入姓名" v-model="defaultSearch.params.name"></el-input></el-col>
            </el-row >
          </el-col>
        </el-row>
      </search-box>
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
      @selection-change="selectChange"
      border
      fit
      highlight-current-row
      @sort-change="orderSort"
    >
      <el-table-column
        type="index"
        width="35"
      />
      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          <span :title="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色代码" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色描述" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <i class="el-icon-edit operation" title="修改" @click="edit(scope.row.id)" />
          <i class="el-icon-delete operation" title="删除" @click="remove(scope.row.id)"/>
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
import { getList, bulk, update } from '@/api/sys/role'
import Pagination from '@/components/Pagination'
import FormDialog from './dialog/FormDialog'

export default {
  components: {
    Pagination,
    FormDialog
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      showSearchBox: false,
      list: [],
      total: 0,
      page: 0,
      limit: 0,
      listLoading: true,
      input: '',
      ids: [],
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
   watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
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
    openSearchBox () {
      this.$refs.searchBox.openDialog()
    },
    remove (id) {
      this.$confirm('是否删除该角色?', '提示', {
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
    selectChange(selection) {
      this.ids = selection.map(row => {return row.id})

    }
  }
}
</script>
