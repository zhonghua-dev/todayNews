<template>
    <el-select clearable v-model="value" placeholder="请选择">
        <el-option
                v-for="item in channelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  data () {
    return {
      value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      // const arr = await this.$http.get('channel')
      // console.log(arr)
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped>

</style>
