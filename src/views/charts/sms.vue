<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-06 11:40:33
 * @LastEditors: anan
 * @LastEditTime: 2019-10-06 11:41:53
 -->

<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/Sms'

export default {
  name: 'SmsChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

