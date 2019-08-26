<template>
    <el-card>
        <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </el-card>
</template>
<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="less">

</style>
