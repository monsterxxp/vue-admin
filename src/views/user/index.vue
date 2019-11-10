<template>
  <div class="app-container">
    <div class="list-top">
      <div class="search-group">
        <el-select v-model="defaultSearch.params.status" class="search-select-out" placeholder="全部" @change="fetchData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="defaultSearch.params.name" class="search-input-out" prefix-icon="el-icon-search" placeholder="请输入姓名或者账号按回车进行搜索..." @keyup.enter.native="fetchData" />
        <el-button circle @click="showSearchBox = !showSearchBox">
          <i class="el-icon-caret-bottom" title="查询更多" />
        </el-button>
      </div>
      <div class="list-botton-group">
        <el-button @click="create">
          <i class="el-icon-plus" title="新增" />
        </el-button>
        <el-button>
          <i class="el-icon-delete" title="批量删除" />
        </el-button>
        <el-dropdown split-button>
          <i class="el-icon-printer" title="导出列表" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导出模板</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <div v-if="showSearchBox" class="search-box">
        <el-row :gutter="20">
          <el-col :span="8">
            <label>创建时间</label>
            <el-input v-model="defaultSearch.params.name" class="search-input-out" prefix-icon="el-icon-search" placeholder="请输入姓名." />
          </el-col>
        </el-row>
        <div class="search-box-btn-group">
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button @click="clearSearchParams">重置</el-button>
        </div>
      </div>
    </transition>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @sort-change="orderSort"
    >
      <el-table-column
        type="selection"
        width="35"
      />
      <el-table-column label="ID" prop="id" width="110" align="center" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span :title="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="'1'"
            :inactive-value="'0'"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <i class="el-icon-search operation" title="查看" @click="view(scope.row)" />
          <i class="el-icon-refresh operation" title="重置密码" />
          <i class="el-icon-edit operation" title="密码修改" />
          <i class="el-icon-delete operation" title="删除" />
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :total="total"
      :page="page"
      :limit="limit"
      @pagination="pageSearch"
    />
    <user-create ref="userCreate" />
    <user-detail ref="userDetail" />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import UserCreate from './dialog/UserCreate'
import UserDetail from './dialog/UserDetail'

export default {
  components: {
    Pagination,
    UserCreate,
    UserDetail
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
      value2: '',
      showSearchBox: false,
      list: [],
      total: 0,
      page: 0,
      limit: 0,
      listLoading: true,
      input: '',
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
      this.defaultSearch.page = params.page
      this.defaultSearch.limit = params.limit
      this.fetchData()
    },
    orderSort(row) {
      this.defaultSearch.sortItem = row.prop
      this.defaultSearch.asc = row.order === 'ascending'
      this.fetchData()
    },
    clearSearchParams() {
      this.defaultSearch.params = {}
      this.fetchData()
    },
    create() {
      // this.$router.push({
      //   name: 'createUser'
      // })
      this.$refs.userCreate.openDialog()
    },
    view(data) {
      this.$refs.userDetail.openDialog(data)
    }
  }
}
</script>
