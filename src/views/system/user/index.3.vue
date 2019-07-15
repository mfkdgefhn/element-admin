<template>
  <div class="components-container">
    <multipane class="foo" layout="vertical">
      <div :style="{ width: '100px', maxWidth: '200px' ,higth:'500px'}">
        <left-tree class="split" />
      </div>
      <multipane-resizer />
      <complex-table />
      <div :style="{ width: '25%', maxWidth: '50%' }">
        <complex-table />
      </div>
    </multipane>
    <!-- <el-row>
      <el-col :span="4">
        <left-tree class="split" />
      </el-col>
      <el-col :span="20">
        <el-card shadow="hover">
          <complex-table />
        </el-card>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'
// import splitPane from 'vue-splitpane'
// import leftTree from './left-tree'
// import complexTable from './complex-table'

export default {

  name: 'SplitpaneDemo',
  components: { /* splitPane , */
    // leftTree,
    // complexTable,
    Multipane,
    MultipaneResizer },
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
.multipane.foo.layout-v .multipane-resizer {
  margin: 0;
  left: 0; /* reset default styling */
  width: 15px;
  background: blue;
}
.multipane.foo.layout-h .multipane-resizer {
  margin: 0;
  top: 0; /* reset default styling */
  height: 15px;
  background: blue;
}
</style>
