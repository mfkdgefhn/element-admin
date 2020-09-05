<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-09-05 11:32:50
 * @LastEditors: anan
 * @LastEditTime: 2020-09-05 14:24:21
-->

<template>
  <div class="chart-container">
    <proportion-of-sales height="100%" width="100%" />
  </div>
</template>

<script>
import proportionOfSales from '@/components/Charts/proportionOfSales'

export default {
  name: 'OpenCardRate',
  components: { proportionOfSales }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

