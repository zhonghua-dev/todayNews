<template>
  <div class="img_container">
    <div class="img_btn" @click="openDialog">
      <img src="../assets/images/default.png" alt="">
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group @change="toggleCollect" v-model="reqParams.collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div class="img_item" v-for="item in images" :key="item.id">
              <img :src="item.url" alt="">
            </div>
          </div>
          <el-pagination
            @current-change="changePager"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            background
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
<!--          <div slot="footer" class="dialog-footer">-->
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
<!--          </div>-->
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            name="image"
            :headers="headers"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess">
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      uploadImageUrl: null
    }
  },
  methods: {
    handleSuccess (res) {
      this.$message.success('upload success')
      this.uploadImageUrl = res.data.url
      this.dialogVisible = false
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      this.getImages()
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      console.log(data)
      this.total = data.total_count
      this.reqParams.page = data.page
    }
  }
}
</script>

<style scoped lang="less">
  .img_container {
    /*display: inline-block;*/
    /*margin-right: 20px;*/

    .img_list {
      margin-top: 20px;

      .img_item {
        display: inline-block;

        img {
          display: block; // 去除下间距
          width: 160px;
          height: 120px;
          border: 1px dashed #ddd;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }

</style>
