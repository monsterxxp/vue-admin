<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="5" style="padding: 10px;">
        <dict-category ref="dictCategory" @create="createCategory" @view="viewCategory" @edit="editCategory" @remove="removeCategory" @checkItem="checkItem"/>
      </el-col>
      <el-col :span="19">
        <div class="list-top">
          <div class="search-group">
            <el-input v-model="defaultSearch.params.code" class="search-input-out" prefix-icon="el-icon-search" placeholder="请输入字典代码或名称按回车进行搜索..." @keyup.enter.native="searchDict" />
          </div>
          <div class="list-botton-group">
            <el-button @click="createDict">
              <i class="el-icon-plus" title="新增" />
            </el-button>
          </div>
        </div>
        <el-table
          v-loading="listLoading"
          :data="dictList"
          :empty-text="currentDictCategory ? '暂无数据':'暂无数据，请点击左侧字典分类获取数据'"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="字典代码" align="center">
            <template slot-scope="scope">
              <span :title="scope.row.code">{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="字典名称" min-width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属分类" min-width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.categoryCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="排序" min-width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sort }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述" min-width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.isUpdate === '1'">
                <i class="el-icon-edit operation" title="修改" @click="editDict(scope.row.id)" />
                <i class="el-icon-delete operation" title="删除" @click="removeDict(scope.row.id)"/>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <dict-category-create ref="dictCategoryCreate" @search="categorySearch"/>
    <dict-category-detail ref="dictCategoryDetail"/>
    <dict-create ref="dictCreate" :dictCategory="currentDictCategory" @search="searchDict"/>
  </div>
</template>

<script>
import { findDictCategoryList, findDictList, bulkCategory, bulkDict } from '@/api/sys/dict'
import Pagination from '@/components/Pagination'
import DictCategory from './components/DictCategory'
import DictCategoryCreate from './dialog/DictCategoryCreate'
import DictCategoryDetail from './dialog/DictCategoryDetail'
import DictCreate from './dialog/DictCreate'

export default {
  components: {
    Pagination,
    DictCategory,
    DictCategoryCreate,
    DictCategoryDetail,
    DictCreate
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
      list: [],
      dictList: [],
      total: 0,
      page: 0,
      limit: 0,
      listLoading: false,
      currentDictCategory: null,
      defaultSearch: {
        page: 1,
        limit: 9999,
        params: {}
      },
      categoryDictSearch: {
        page: 1,
        limit: 9999,
        params: {}
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      findDictCategoryList(this.categoryDictSearch).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.page = response.data.current
        this.limit = response.data.size
        this.$refs.dictCategory.init(this.list)
      })
    },
    categorySearch () {
      this.fetchData()
      this.currentDictCategory = null
      this.defaultSearch.params = {}
      this.dictList = []
    },
    searchDict() {
      this.listLoading = true
      findDictList(this.defaultSearch).then(response => {
        this.dictList = response.data.records
        this.listLoading = false
      })
    },
    createCategory() {
      this.$refs.dictCategoryCreate.openDialog(false, null)
    },
    editCategory(id) {
      this.$refs.dictCategoryCreate.openDialog(true, id)
    },
    removeCategory(id) {
      this.$confirm('是否删除该字典类别?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bulkCategory(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData()
          this.currentDictCategory = null
          this.defaultSearch.params = {}
          this.dictList = []
        })
      })
    },
    viewCategory(id) {
      this.$refs.dictCategoryDetail.openDialog(id)
    },
    createDict() {
      if (!this.currentDictCategory) {
        this.$message({
          message: '请先选择左侧字典分类',
          type: 'warning'
        })
        return;
      }
      this.$refs.dictCreate.openDialog(false, null)
    },
    editDict(id) {
      this.$refs.dictCreate.openDialog(true, id)
    },
    removeDict(id) {
      this.$confirm('是否删除该字典参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bulkDict(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.searchDict()
        })
      })
    },
    checkItem(data) {
      this.currentDictCategory = data
      this.defaultSearch.params = {}
      this.defaultSearch.params.categoryCode = data.code
      this.listLoading = true
      this.searchDict()
    },
    edit(data) {
      this.$refs.userDetail.openDialog(data)
    },
    remove (id) {
      
    }
  }
}
</script>
