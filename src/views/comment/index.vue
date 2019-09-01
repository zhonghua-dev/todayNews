<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题" width="400px"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.comment_status?'正常':'关闭'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toggleStatus(scope.row)" size="small" type="danger" v-if="scope.row.comment_status">关闭评论</el-button>
          <el-button @click="toggleStatus(scope.row)" size="small" type="success" v-else>打开评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="reqParams.per_page"
      layout="prev, pager, next"
      @current-change="changePage"
      :current-page="reqParams.page"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      articles: [],
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async toggleStatus (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
  .el-pagination {
    margin: 20px auto;
    text-align: center;
  }

</style>
