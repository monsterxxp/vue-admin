<template>
  <el-dialog :title="isEdit ? '修改字典参数': '新增字典参数'" :visible.sync="open" v-if="open" @close="close">
    <div>

      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row v-if="dictCategory" :gutter="20">
          <el-col :span="11">
            <el-form-item label="字典分类代码">
              <el-input v-model="dictCategory.code" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="字典分类名称">
              <el-input v-model="dictCategory.name" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="字典参数代码" prop="code">
              <el-input v-model="form.code"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="字典名称名称" prop="name">
              <el-input v-model="form.name"/>
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
import { saveDict, findDictById, updateDict } from '@/api/sys/dict'

export default {
  props: ['dictCategory'],
  data() {
    return {
      open: false,
      isEdit: false,
      form: {
        name: '',
        code: '',
        categoryCode: '',
        parentId: '',
        sort: 0,
        description: ''
      },
      formLabelWidth: '120px',
      submitLoading: false,
      rules: {
        code: [
          { required: true, message: '请输入字典分类代码', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
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
        findDictById(id).then(response => {
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
            updateDict(this.form).then(response => {
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
            this.form.categoryCode = this.dictCategory.code
            this.form.parentId = '0'
            saveDict(this.form).then(response => {
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
