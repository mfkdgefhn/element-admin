<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-09-05 11:32:50
 * @LastEditors: anan
 * @LastEditTime: 2020-09-05 13:46:27
-->

<template>
  <div class="chart-container">
    <open-card height="100%" width="100%" />
  </div>
</template>

<script>
import openCard from '@/components/Charts/openCard'

export default {
  name: 'OpenCardRate',
  components: { openCard }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

