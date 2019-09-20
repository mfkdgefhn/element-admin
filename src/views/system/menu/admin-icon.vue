<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-12 10:35:13
 * @LastEditors: anan
 * @LastEditTime: 2019-09-20 14:43:30
 -->
<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons" class="icons-container">
        <div v-for="item of svgIcons" :key="item" @click="handleClipboard(item,$event)">
          <el-tooltip placement="top">
            <div slot="content">{{ generateIconCode(item) }}</div>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="Element-UI Icons" class="icons-container">
        <div
          v-for="item of elementIcons"
          :key="item"
          @click="handleClipboard(generateElementIconCode(item),$event)"
        >
          <el-tooltip placement="top">
            <div slot="content">{{ generateElementIconCode(item) }}</div>
            <div class="icon-item">
              <i :class="'el-icon-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>

// import clipboard from '@/utils/clipboard' // 复制到剪切板工具
import svgIcons from './svg-icons' // 外部ICON图标
import elementIcons from './element-icons' // 内部element  icon图标

export default {
  name: 'Icons',
  data() {
    return {
      svgIcons,
      elementIcons
    }
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    handleClipboard(text, event) {
      // console.log(text)
      // console.log(event)
      // clipboard(text, event)
      this.$emit('updateIcon', text)
    }
  }
}
</script>

<style lang="scss" >
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
