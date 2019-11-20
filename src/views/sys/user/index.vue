<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="5" style="padding: 10px;">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="deptTree"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          ref="tree">
        </el-tree>
      </el-col>
      <el-col :span="19">
        <div class="list-top">
          <div class="search-group">
            <el-select v-model="defaultSearch.params.userStatus" class="search-select-out" placeholder="全部" @change="fetchData">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input v-model="defaultSearch.params.name" class="search-input-out" prefix-icon="el-icon-search" placeholder="请输入姓名或者账号按回车进行搜索..." @keyup.enter.native="fetchData" />
            <el-button circle @click="openSearchBox">
              <i class="el-icon-caret-bottom" title="查询更多" />
            </el-button>
          </div>
          <div class="list-botton-group">
            <el-button @click="create">
              <i class="el-icon-plus" title="新增" />
            </el-button>
            <el-button @click="batchBulk">
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
            type="selection"
            width="35"
          />
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
          <el-table-column label="手机" min-width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" min-width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="用户状态" width="140" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.userStatus"
                active-text="启用"
                inactive-text="禁用"
                style="display: block"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="'1'"
                :inactive-value="'0'"
                @change="updateStatus(scope.row)"
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
              <i class="el-icon-edit operation" title="修改" @click="edit(scope.row)" />
              <i class="el-icon-refresh operation" @click="resetPwd(scope.row)" title="重置密码" />
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
      </el-col>
    </el-row>
  
    <user-create ref="userCreate" @search="fetchData" />
    <user-detail ref="userDetail" />
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
import { getList, bulk, update, resetPwd, batchBulk } from '@/api/sys/user'
import { getTree } from '@/api/sys/dept'
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
      ids: [],
      deptTree: [],
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
      },
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id'
      }
    }
  },
  mounted() {
    this.fetchData()
    this.getDeptTree()
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
    getDeptTree() {
      getTree().then(response => {
        this.deptTree = response.data
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
      // this.$router.push({
      //   name: 'createUser'
      // })
      this.$refs.userCreate.openDialog()
    },
    edit(data) {
      this.$refs.userDetail.openDialog(data)
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    openSearchBox () {
      this.$refs.searchBox.openDialog()
    },
    remove (id) {
      this.$confirm('是否删除该用户?', '提示', {
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
    updateStatus(data) {
      this.$confirm('是否变更用户状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        update(data).then(response => {
          this.$message({
            type: 'success',
            message: '状态变更成功!'
          });
          this.fetchData()
        })
      }).catch(() => {
        this.fetchData()
      })
    },
    resetPwd(data) {
      this.$confirm('是否重置该用户密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPwd(data).then(response => {
          this.$message({
            type: 'success',
            message: '密码重置成功!'
          });
          this.fetchData()
        })
      })
    },
    selectChange(selection) {
      this.ids = selection.map(row => {return row.id})

    },
    batchBulk() {
      this.$confirm('是否删除选择的用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchBulk(this.ids).then(response => {
          this.$message({
            type: 'success',
            message: '删除用户成功!'
          });
          this.fetchData()
        })
      })
    },
    handleNodeClick(data) {
      console.log(data)
      this.defaultSearch.params.deptId = data.id
      this.fetchData()
    }
  }
}
</script>
