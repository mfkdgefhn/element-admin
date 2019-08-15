<template>
  <!-- 收缩 -->
  <div class="components-container">
    <el-row type="flex" justify="space-between">
      <el-col v-if="expand" :span="4" class="test">
        <!-- 左边树菜单 -->
        <left-tree class="split" />
      </el-col>

      <!-- 中间折叠 -->
      <div class="expand">
        <i :class="expandIcon" size="16" @click="changeExpand" />
      </div>

      <!-- 右边表格 -->
      <el-col :span="span">
        <complex-table />
        <el-card shadow="hover" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import leftTree from './left-tree'
import complexTable from './complex-table'

export default {
  components: { /* splitPane , */ leftTree, complexTable },
  data() {
    return {
      expand: true,
      expandIcon: 'el-icon-arrow-left',
      span: 19
    }
  },
  created() {
    this.initUserInfo()
  },
  methods: {
    initUserInfo() {
      this.$store.dispatch('user/getUserList')
        .then(() => {
          // console.log('获取用户信息并存入vuex成功')
        })
        .catch(() => {
          console.log('失败')
        })
    },
    resize() {
      console.log('resize')
    },
    changeExpand() {
      this.expand = !this.expand
      if (this.expand) {
        this.expandIcon = 'el-icon-arrow-left'
        this.span = 19
      } else {
        this.expandIcon = 'el-icon-arrow-right'
        this.span = 23
      }
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
.expand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.expand i:hover {
  color: #1890ff !important;
}
</style>
