<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-09-05 11:32:50
 * @LastEditors: anan
 * @LastEditTime: 2020-10-07 10:19:31
-->

<template>
  <div class="chart-container">
    <vouWrite-off height="100%" width="100%" />
  </div>
</template>

<script>
import vouWriteOff from '@/components/Charts/vouWriteOff'

export default {
  name: 'OpenCardRate',
  components: { vouWriteOff }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
