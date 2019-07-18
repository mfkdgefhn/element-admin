<template>
  <div>
    <el-card>
      <el-row type="flex" justify="space-between">
        <el-col v-if="expand" :span="5" class="test">
          <!-- 左边树菜单 -->
          <left-tree class="split" />
        </el-col>
        <!-- 中间折叠 -->
        <div class="expand">
          <i v-if="expand" class="el-icon-arrow-left" size="16" @click="changeExpand" />
          <i v-else class="el-icon-arrow-right" size="16" @click="changeExpand" />
        </div>
        <el-col :span="span">
          <el-card shadow="hover">
            <complex-table />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expand: true,
      expandIcon: '',
      span: 18
    }
  },
  methods: {
    changeExpand() {
      this.expand = !this.expand
      if (this.expand) {
        this.expandIcon = 'el-icon-arrow-left'
        this.span = 18
      } else {
        this.expandIcon = 'el-icon-arrow-right'
        this.span = 23
      }
    }
  }
}
</script>

<style>
.expand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.expand .icon {
  cursor: pointer;
}
.expand .icon:hover {
  color: #1890ff !important;
}
</style>
