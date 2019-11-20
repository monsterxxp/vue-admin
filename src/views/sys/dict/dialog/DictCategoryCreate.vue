<template>
  <el-dialog :title="isEdit? '修改字典类别':'新增字典分类'" :visible.sync="open" v-if="open" @close="close">
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="字典分类代码" prop="code">
              <el-input v-model="form.code" :disabled="isEdit"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="字典分类名称" prop="name">
              <el-input v-model="form.name" />
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
import { saveDictCategory, findCategoryById, updateCategory } from '@/api/sys/dict'

export default {
  data() {
    return {
      open: false,
      isEdit: false,
      view: false,
      form: {
        name: '',
        code: '',
        description: ''
      },
      formLabelWidth: '120px',
      submitLoading: false,
      rules: {
        code: [
          { required: true, message: '请输入字典分类代码', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入字典分类名称', trigger: 'blur' },
          { max: 32, message: '长度在 32 个字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openDialog(isEdit, id) {
      this.isEdit = isEdit
      if (this.isEdit) {
        findCategoryById(id).then(response => {
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
            updateCategory(this.form).then(response => {
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
            saveDictCategory(this.form).then(response => {
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
