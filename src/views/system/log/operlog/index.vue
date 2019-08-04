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
  },
  methods: {
  }
}
</script>

<style  scoped>
.components-container {
  margin: 0;
  position: relative;
  height: 100%;
  padding: 10px;
}
</style>
