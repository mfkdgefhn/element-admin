<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-23 10:28:44
 * @LastEditors: anan
 * @LastEditTime: 2019-09-23 10:32:41
 -->
<template>
  <!-- 收缩 -->
  <div class="components-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-card shadow="hover">
          <!-- 右边表格 -->
          <complex-table />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import complexTable from './complex-table'

export default {

  components: { complexTable },
  data() {
    return {
    }
  }
}
</script>

<style>
</style>
