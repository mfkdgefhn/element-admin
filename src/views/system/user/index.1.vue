<template>
  <div class="components-container">
    <split-pane :default-percent="15" split="vertical" @resize="resize">
      <!-- 左边菜单树 -->
      <template slot="paneL">
        <left-tree class="split" />
      </template>

      <!-- 右边内容 -->
      <template slot="paneR">
        <el-row :gutter="16">
          <!-- <el-col :span="23" class="right-col commob"> -->
          <el-card shadow="hover">
            <complex-table />
          </el-card>
          <!-- </el-col> -->
        </el-row>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import leftTree from './left-tree'
import complexTable from './complex-table'

export default {

  name: 'SplitpaneDemo',
  components: { splitPane, leftTree, complexTable },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style  scoped>
.components-container {
  margin: 0;
  position: relative;
  height: 100%;
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
</style>
