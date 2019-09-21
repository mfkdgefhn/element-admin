<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-21 13:08:36
 * @LastEditors: anan
 * @LastEditTime: 2019-09-21 13:08:36
 -->
<template>
  <ele-form
    v-if="isShow && formItem"
    :form-data="formItem.formData"
    :form-desc="formItem.formDesc"
    :is-show-back-btn="false"
    :is-show-submit-btn="false"
    :rules="rules"
    :span="20"
    class="app-item-attr"
    label-position="top"
  />
</template>

<script>
export default {
  name: 'AppFormAttr',
  props: {

    formItem: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      isShow: false,
      rules: {
        field: {
          required: true, message: '字段必填'
        },
        label: {
          required: true, message: '标签不能为空'
        }
      }
    }
  },
  watch: {
    // 重新渲染
    'formItem.formDesc'(val) {
      this.isShow = false
      if (val) {
        this.$nextTick(() => {
          this.isShow = true
        })
      }
    }
  }
}
</script>
