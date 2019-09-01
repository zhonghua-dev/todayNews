<template>
  <el-card class="article-container">
    <div slot="header" class="clearfix">
      <my-bread>发布文章</my-bread>
    </div>
    <el-form label-width="80px">
      <el-form-item label="标题：">
        <el-input style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <quill-editor v-model="articlesForm.content" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group @change="changeType" v-model="articlesForm.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <my-image></my-image>
      </el-form-item>
      <el-form-item label="频道：">
        <my-channel></my-channel>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  name: 'index',
  data () {
    return {
      editorOption: {
        placeholder: '',
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            ['image']
          ]
        }
      },
      articlesForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      dialogVisible: false
    }
  },
  methods: {
    changeType () {
      this.articlesForm.cover.images = []
    },
    openDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
