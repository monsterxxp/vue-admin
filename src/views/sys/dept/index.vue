<template>
  <div class="app-container">
    <div class="list-top">
      <div class="search-group">
        <el-input v-model="defaultSearch.params.name" class="search-input-out" prefix-icon="el-icon-search" placeholder="请输入姓名或者账号按回车进行搜索..." @keyup.enter.native="fetchData" />
        <el-button circle @click="openSearchBox">
          <i class="el-icon-caret-bottom" title="查询更多" />
        </el-button>
      </div>
      <div class="list-botton-group">
        <el-button @click="create">
          <i class="el-icon-plus" title="新增" />
        </el-button>
        <el-dropdown split-button>
          <i class="el-icon-printer" title="导出列表" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导出模板</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
  </div>
</template>

<script>
import { getTree, bulk, update, resetPwd, batchBulk } from '@/api/sys/dept'
import Pagination from '@/components/Pagination'
import DeptCreate from './dialog/DeptCreate'
// import UserDetail from './dialog/UserDetail'

export default {
  components: {
    Pagination,
    DeptCreate
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
      listLoading: true,
      ids: [],
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '启用'
      }, {
        value: '0',
        label: '禁用'
      }],
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
   watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTree(this.defaultSearch).then(response => {
        this.list = response.data
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
      // this.fetchData()
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    openSearchBox () {
      this.$refs.searchBox.openDialog()
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
