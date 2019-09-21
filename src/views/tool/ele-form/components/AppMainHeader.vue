<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-21 13:08:36
 * @LastEditors: anan
 * @LastEditTime: 2019-09-21 14:20:41
 -->
<template>
  <div class="app-main-header-container">
    <!-- 顶部按钮 -->
    <el-button icon="el-icon-view" type="text" @click="isPreview = true">预览</el-button>
    <el-button icon="el-icon-upload2" type="text" @click="isShowData = true">生成数据</el-button>
    <el-button icon="el-icon-tickets" type="text" @click="isShowCode = true">生成代码</el-button>
    <el-dialog v-if="isPreview" :visible.sync="isPreview" append-to-body title="预览" width="90%">
      <ele-form
        :form-desc="formDesc"
        :form-data="formData"
        :request-fn="handleRequest"
        :rules="computedRules"
        v-bind="formAttr"
        @request-success="handleRequestSuccess"
      />
    </el-dialog>
    <!-- 导出数据弹框 -->
    <el-dialog v-if="isShowData" :visible.sync="isShowData" append-to-body title="数据" width="600px">
      <json-editor :value="codeData" />
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="handleCopyData">复制数据</el-button>
      </div>
    </el-dialog>

    <!-- 生成代码弹框 -->
    <el-dialog v-if="isShowCode" :visible.sync="isShowCode" append-to-body title="代码" width="600px">
      <codemirror :value="codeHtml" />
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="handleCopyHtml">复制代码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tpl from './tpl'
const copy = require('clipboard-copy')
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'AppMainHeader',
  props: {
    formDesc: {
      type: Object,
      default: () => { }
    },
    formAttr: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      tpl: tpl,
      formData: {},
      isShowData: false,
      isShowCode: false,
      isPreview: false
    }
  },
  computed: {
    codeHtml() {
      let htmlFormAttr = ''
      const formAttrEntries = Object.entries(this.formAttr)
      // 拼接ele-form属性
      if (formAttrEntries.length) {
        htmlFormAttr = formAttrEntries.reduce((acc, val) => {
          acc.push(`:${val[0]}="${val[1]}"`)
          return acc
        }, [])
        htmlFormAttr = htmlFormAttr.join('\n    ') + '\n    '
      }
      return this.tpl.replace('%1', htmlFormAttr).replace('%2', JSON.stringify(this.computedDesc)).replace('%3', JSON.stringify(this.computedRules))
    },

    // 数据
    codeData() {
      return Object.assign({}, this.formAttr, {
        formDesc: this.computedDesc,
        rules: this.computedRules
      })
    },

    // 获取校检规则
    computedRules() {
      const formDesc = cloneDeep(this.formDesc)
      const rules = Object.keys(formDesc).reduce((rules, key) => {
        if (formDesc[key].required) {
          rules[key] = [
            { required: true, message: '请输入' + formDesc[key].label }
          ]
        }
        return rules
      }, {})

      return rules
    },
    // 将 desc 去除校检
    computedDesc() {
      const formDesc = cloneDeep(this.formDesc)
      for (const key in formDesc) {
        if (formDesc[key].required) {
          delete formDesc[key].required
        }
      }
      return formDesc
    }
  },
  methods: {
    handleCopyData() {
      copy(JSON.stringify(this.codeData))
      this.$message.success('复制成功!')
    },
    handleCopyHtml() {
      copy(this.codeHtml)
      this.$message.success('复制成功!')
    },
    handleRequest(data) {
      console.log(data)
      return Promise.resolve()
    },
    handleRequestSuccess() {
      this.$message.success('发送成功')
    }
  }
}
</script>

<style>
* {
  touch-action: pan-y;
}
.app-main-header-container {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  border-bottom: 1px solid #ebeef5;
}
</style>
