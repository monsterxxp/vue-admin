<template>
  <el-dialog  title="查看字典分类" :visible.sync="open" v-if="open" @close="close">
    <div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="字典分类代码" prop="code">
              <el-input v-model="form.code" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="字典分类名称" prop="name">
              <el-input v-model="form.name" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="描述" prop="description">
              <el-input
                v-model="form.description"
                disabled
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
    </div>
  </el-dialog>
</template>

<script>
import { findCategoryById } from '@/api/sys/dict'

export default {
  data() {
    return {
      open: false,
      form: {
        name: '',
        code: '',
        description: ''
      },
      formLabelWidth: '120px',
    }
  },
  methods: {
    openDialog(id) {
      findCategoryById(id).then(response => {
        this.form = response.data
        this.open = true
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
