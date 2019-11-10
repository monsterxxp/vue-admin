<template>
  <el-dialog title="新增用户" :visible.sync="open">
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
              <el-input v-model="form.sex" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所属机构" prop="deptId">
              <el-input v-model="form.deptId" />
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
export default {
  data() {
    return {
      open: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
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
  methods: {
    openDialog(data) {
      console.log(data)
      this.form = data
      this.open = true
    },
    submit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          setTimeout(() => {
            this.open = false
            this.submitLoading = false
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            })
          }, 3000)
        }
      })
    }
  }
}
</script>

<style>

</style>
