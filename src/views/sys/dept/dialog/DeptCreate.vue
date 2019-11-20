<template>
  <el-dialog :title="isEdit?'修改部门':'新增部门'" :visible.sync="open" v-if="open" @close="close">
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="组织名称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="组织代号" prop="code">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <div>
              <el-form-item label="负责人" prop="leaderId">
                <sk-select :content="userList" :clearValue="true" v-model="form.leaderId"/>
              </el-form-item>
            </div>
            
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系电话" prop="contactPhone">
              <el-input v-model="form.contactPhone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="form.sort" controls-position="right" :min="1" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item v-if="form.parentId !== '0'" label="上级部门" prop="parentId">
              <sk-select :type="'tree'" :content="deptTree"  :clearValue="true" v-model="form.parentId"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="描述" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="open = false">取 消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTree, save, findDTOById, update } from '@/api/sys/dept'
import { getList } from '@/api/sys/user'

export default {
  data() {
    return {
      open: false,
      form: {},
      isEdit: false,
      formLabelWidth: '120px',
      submitLoading: false,
      userList: [],
      deptTree: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 32, message: '长度在 32 个字符以内', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择上级部门', trigger: 'blur' },
          { min: 1, message: '123', trigger: 'blur' }
        ],
        leaderId: [
          { required: true, message: '请选择上级部门', trigger: 'blur' },
          { min: 1, message: '123', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTree(this.defaultSearch).then(response => {
        this.deptTree = response.data
      })
      getList().then(response => {
        this.userList = response.data.records
      })
    },
    openDialog(isEdit, id, parentId) {
      console.log(parentId)
      this.isEdit = isEdit
      this.form = {}
      if (parentId) {
        this.form.parentId = parentId
      }
      if (isEdit) {
        findDTOById(id).then(response => {
          this.form = response.data
          this.open = true
        })
      } else {
          this.open = true
      }
      
    },
    submit() {
      this.$refs.form.clearValidate()
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          if (this.isEdit) {
            update(this.form).then(response => {
              this.$emit('search')
              this.open = false
              this.submitLoading = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }).catch(()=>{
              this.submitLoading = false
          })
          } else {
            save(this.form).then(response => {
              this.$emit('search')
              this.open = false
              this.submitLoading = false
              this.$message({
                message: '新增成功',
                type: 'success'
              })
            }).catch(()=>{
              this.submitLoading = false
            })
          }
        }
      })
    },
    close () {
      this.form = {}
    }
  }
}
</script>

<style>
  
</style>
