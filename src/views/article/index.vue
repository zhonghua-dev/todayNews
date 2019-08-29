<template>
    <div class="container">
        <el-card>
            <div slot="header">
                <my-bread>内容管理</my-bread>
            </div>
            <el-form label-width="80px" size="small">
                <el-form-item label="状态：">
                    <el-radio-group v-model="reqParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道：">
                    <my-channel v-model="reqParams.channel_id"></my-channel>
                </el-form-item>
                <el-form-item label="日期：">
                    <el-date-picker
                            v-model="dateArr"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search" type="primary">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>根据筛选条件共查询到 {{ total }} 条结果：</span>
            </div>
            <el-table :data="articles" style="width: 100%">
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.cover.images[0]" style="width: 160px;height: 100px">
                            <div slot="error" class="image-slot">
                                <img src="../../assets/images/error.gif" alt="" style="width: 160px;height: 100px;">
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
                        <el-tag v-if="scope.row.status===1" >待审核</el-tag>
                        <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
                        <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="pubdate" label="发布时间"></el-table-column>
                <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="$router.push('/publish?id='+scope.row.id)" plain icon="el-icon-edit" circle></el-button>
                        <el-button type="danger" @click="delArticle(scope.row.id)" plain icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="pager"
                    :current-page="reqParams.page"
                    background layout="prev, pager, next"
                    :page-size="reqParams.per_page"
                    @current-change="changePager"
                    :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      // channelOptions: [],
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除成功')
        this.getArticles()
      }).catch(() => {
      })
    },
    search () {
      this.reqParams.page = 1
      // if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.getArticles()
    },
    // async getChannelOptions () {
    //   // const arr = await this.$http.get('channel')
    //   // console.log(arr)
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    changePager (newPager) {
      this.reqParams.page = newPager
      this.getArticles()
    }
  }
}
</script>

<style scoped lang="less">
    .box-card {
        margin-top: 20px;
        .pager {
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
