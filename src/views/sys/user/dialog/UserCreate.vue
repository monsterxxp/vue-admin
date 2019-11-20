<template>
  <el-dialog title="新增用户" :visible.sync="open" v-if="open" @close="close">
    <div>

      <el-form ref="userForm" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="账号" prop="account">
              <el-input v-model="form.account" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="性别" prop="sex">
              <dict-select :content="'user_sex'" v-model="form.sex"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所属机构" prop="deptId">
              <sk-select :content="deptTree" v-model="form.deptId" :type="'tree'" :clearValue="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="form.mobile" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="岗位" prop="postId">
              <el-input v-model="form.postId" />
            </el-form-item>
          </el-col>
          <el-col :span="11" />
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
import { save } from '@/api/sys/user'
import { getTree } from '@/api/sys/dept'

export default {
  data() {
    return {
      open: false,
      form: {
        name: '',
        account: '',
        sex: '',
        deptId: '',
        mobile: '',
        email: '',
        postId: '',
        description: ''
      },
      deptTree:[],
      formLabelWidth: '120px',
      submitLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 32, message: '长度在 32 个字符以内', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    getTree().then(response => {
      this.deptTree = response.data
    }) 
  },
  methods: {
    openDialog() {
      this.open = true
    },
    submit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          save(this.form).then(response => {
            this.$emit('search')
            this.open = false
            this.submitLoading = false
            this.$message({
              message: '用户新增成功',
              type: 'success'
            })
          })
          this.submitLoading = false
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
