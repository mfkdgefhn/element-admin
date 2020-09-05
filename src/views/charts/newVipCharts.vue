<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-09-05 11:32:50
 * @LastEditors: anan
 * @LastEditTime: 2020-09-05 11:35:25
-->

<template>
  <div class="chart-container">
    <new-vip height="100%" width="100%" />
  </div>
</template>

<script>
import NewVip from '@/components/Charts/NewVip'

export default {
  name: 'NewVipCharts',
  components: { NewVip }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

