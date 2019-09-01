<template>
  <div class="img-container">
    <div class="img_btn" @click="openDialog">
      <img src="../assets/images/default.png" alt="">
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="750px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="image">

          <el-button-group @change="toggleCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-button-group>
          <div class="img_list">
            <div class="img_item" v-for="item in 10" :key="item">
              <img src="../assets/images/avatar.jpg" alt="">
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传素材" name="upload"></el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      activeName: 'image',
      dialogVisible: false,
      reqParams: {
        collect: true,
        page: 1,
        per_page: 8
      }
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    handleClick () {

    },
    toggleCollect () {
      this.reqParams.page = 1
      console.log(this.reqParams.collect)
    }
  }
}
</script>

<style scoped>

</style>
