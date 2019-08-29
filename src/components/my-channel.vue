<template>
    <el-select @change="changeChannel" :value="value" clearable placeholder="请选择">
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
  // props 属性只读
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    changeChannel (channelID) {
      console.log(channelID)
      // if (channelID === '') channelID = null
      this.$emit('input', channelID)
    }
  }
}
</script>

<style scoped>

</style>
