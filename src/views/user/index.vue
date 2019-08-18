<template>
  <div class="app-container">
    <div class="list-top">
      <div class="search-group">
        <el-select  class="search-select-out"  v-model="defaultSearch.params.status" placeholder="全部" @change="fetchData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input class="search-input-out" prefix-icon="el-icon-search" v-model="defaultSearch.params.name" @keyup.enter.native="fetchData" placeholder="请输入姓名或者账号进行搜索..."></el-input>
        <el-button circle @click="showSearchBox = !showSearchBox">
          <i class="el-icon-caret-bottom" title="查询更多"/>
        </el-button>
      </div>
      <div class="list-botton-group">
        <el-button>
          <i class="el-icon-plus" title="新增"/>
        </el-button>
        <el-button>
          <i class="el-icon-delete" title="批量删除"/>
        </el-button>
        <el-dropdown split-button>
          <i class="el-icon-printer" title="导出列表"/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导出模板</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="search-box" v-if="showSearchBox">
      <el-row :gutter="20">
        <el-col :span="8">
          <label>创建时间</label>
          <el-input class="search-input-out" prefix-icon="el-icon-search" v-model="defaultSearch.params.name"  placeholder="请输入姓名."></el-input>
        </el-col>
      </el-row>
      <div class="search-box-btn-group">
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="clearSearchParams">重置</el-button>
      </div>
    </div>
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
        width="35">
      </el-table-column>
      <el-table-column label="ID" prop="id" width="110" align="center" sortable="custom" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="账号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdTime  | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <i class="el-icon-search operation" title="查看" />
          <i class="el-icon-refresh operation" title="重置密码"/>
          <i class="el-icon-edit operation" title="密码修改"/>
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
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
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
      this.defaultSearch.asc = row.order === 'ascending' ? true : false
      this.fetchData()
    },
    clearSearchParams() {
      this.defaultSearch.params = {}
      this.fetchData()
    }
  }
}
</script>
