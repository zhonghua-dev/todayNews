<template>
  <el-card class="box-card">
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <div>
      <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button @click="openDialog" type="success" size="small" style="float: right">添加素材</el-button>
    </div>
    <div class="img_list">
      <div class="img_item" v-for="item in images" :key="item.id" >
        <img :src="item.url" alt="">
        <div class="footer" v-if="!reqParams.collect">
          <span @click="toggleStatus(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
          <span @click="delImg(item.id)" class="el-icon-delete"></span>
        </div>
      </div>
    </div>
    <el-pagination
      class="my_pager"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="changePage"
      hide-on-single-page
    ></el-pagination>
    <el-dialog
      title="添加素材"
      :visible.sync="dialogVisible"
      width="300px">
      <el-upload
        name="image"
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import store from '@/store'
export default {
  name: 'index',
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      imageUrl: null
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    handleSuccess (res) {
      this.$message.success('upload success')
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 1000)
    },
    openDialog () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    delImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getImages()
      }).catch(() => {

      })
    },
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    }
  }
}
</script>

<style scoped lang="less">
  .img_list {
    margin-top: 20px;

    .img_item {
      width: 160px;
      height: 160px;
      border: 1px solid #ddd;
      position: relative;
      display: inline-block;
      margin-right: 50px;
      margin-top: 20px;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }

      .footer {
        position: absolute;
        left: 0;
        bottom: 0;
        line-height: 30px;
        height: 30px;
        width: 100%;
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
        text-align: center;

        span {
          margin: 0 20px;

          &.red {
            color: red;
          }
        }
      }
    }
  }

  /*.my_pager {*/
  /*  text-align: center;*/
  /*  margin-top: 30px;*/
  /*}*/

</style>
