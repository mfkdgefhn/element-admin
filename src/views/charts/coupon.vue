<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-04 16:32:02
 * @LastEditors: anan
 * @LastEditTime: 2019-10-04 16:32:02
 -->
<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/Coupon'

export default {
  name: 'CouponChart',
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

