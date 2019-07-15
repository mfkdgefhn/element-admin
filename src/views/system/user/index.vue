<template>
  <!-- 收缩 -->
  <div class="components-container">
    <el-button
      v-if="span===0"
      class="biankuan"
      type="primary"
      icon="el-icon-arrow-right"
      @click="editSpan"
    />
    <!-- 展开 -->
    <el-button v-else class="biankuan" type="primary" icon="el-icon-arrow-left" @click="editSpan" />

    <el-row :gutter="10">
      <el-col :span="span">
        <!-- 左边树菜单 -->
        <left-tree class="split" />
      </el-col>

      <!-- 右边表格 -->
      <el-col :span="24-span">
        <el-card shadow="hover">
          <complex-table />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import splitPane from 'vue-splitpane'
import leftTree from './left-tree'
import complexTable from './complex-table'

export default {

  name: 'SplitpaneDemo',
  components: { /* splitPane , */ leftTree, complexTable },
  data() {
    return {
      span: 4
    }
  },
  methods: {
    resize() {
      console.log('resize')
    },
    editSpan() {
      this.span = this.span === 4 ? this.span = 0 : this.span = 4
    }
  }
}
</script>

<style  scoped>
.components-container {
  margin: 0;
  position: relative;
  height: 100%;
  padding: 10px;
  /* height: 100vh; */
}
.split {
  padding: 5px;
}
.right-col {
  margin: 10px 0px 0px 10px;
}
.app-container {
  padding: 0;
}
.border-col {
  border: 1px solid #000;
}
.biankuan {
  position: absolute;
  padding: 5px;
  left: 0px;
  top: 0px;
  z-index: 999;
}
</style>
