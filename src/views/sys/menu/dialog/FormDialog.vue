<template>
  <el-dialog v-if="open" :title="isEdit ? '修改菜单表': '新增菜单表'" :visible.sync="open" @close="close">
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="菜单代码" prop="code">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
          <el-col :span="11" />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="菜单图标" prop="icon">
              <el-input v-model="form.icon" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="菜单链接" prop="menuUrl">
              <el-input v-model="form.menuUrl" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="父级ID" prop="parentId">
              <el-input v-model="form.parentId" />
            </el-form-item>
          </el-col>
          <el-col :span="11" />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort" />
            </el-form-item>
          </el-col>
          <el-col :span="11" />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="菜单类别" prop="menuType">
              <el-input v-model="form.menuType" />
            </el-form-item>
          </el-col>
          <el-col :span="11" />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="权限代码" prop="authCode">
              <el-input v-model="form.authCode" />
            </el-form-item>
          </el-col>
          <el-col :span="11" />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component" />
            </el-form-item>
          </el-col>
          <el-col :span="11" />
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { save, findDTOById, update } from '@/api/sys/SysMenu'

export default {
  data() {
    return {
      open: false,
      isEdit: false,
      form: {
        name: '',
        code: '',
        icon: '',
        menuUrl: '',
        parentId: '',
        sort: '',
        menuType: '',
        authCode: '',
        component: ''
      },
      formLabelWidth: '120px',
      submitLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入菜单代码', trigger: 'blur' }
        ]
        // icon: [
        //   { required: true, message: '请输入菜单图标', trigger: 'blur' }
        // ],
        // menuUrl: [
        //   { required: true, message: '请输入菜单链接', trigger: 'blur' }
        // ],
        // parentId: [
        //   { required: true, message: '请输入父级ID', trigger: 'blur' }
        // ],
        // sort: [
        //   { required: true, message: '请输入排序', trigger: 'blur' }
        // ],
        // menuType: [
        //   { required: true, message: '请输入菜单类别', trigger: 'blur' }
        // ],
        // authCode: [
        //   { required: true, message: '请输入权限代码', trigger: 'blur' }
        // ],
        // component: [
        //   { required: true, message: '请输入组件路径', trigger: 'blur' }
        // ],
      }
    }
  },
  methods: {
    openDialog(isEdit, id) {
      this.isEdit = isEdit
      if (this.isEdit) {
        findDTOById(id).then(response => {
          this.form = response.data
          this.open = true
        })
      } else {
        this.open = true
      }
    },
    submit() {
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
            }).catch(() => {
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
            }).catch(() => {
              this.submitLoading = false
            })
          }
        }
      })
    },
    close() {
      this.open = false
      this.form = {}
    }
  }
}
</script>

<style scoped>

</style>
