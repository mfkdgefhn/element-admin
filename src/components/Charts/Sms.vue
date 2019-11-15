<!--
 * @Description: 说明
 * @Author:
 anan
 * @Date: 2019-10-06 11:37:46
 * @LastEditors: anan
 * @LastEditTime: 2019-11-05 11:37:28
 -->
<template>
  <div :id="id" ref="sms_echarts" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import resize from './mixins/resize'
import { getSms } from '@/api/echarts'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    title: {
      type: String,
      default: '短信发送情况'
    }
  },
  data() {
    return {
      chart: null,
      legendData: [],
      xAxisData: [],
      seriesData: []
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      getSms().then(response => {
        const couponData = response.data.result.reverse()
        // 渲染图例组件
        this.renderLegend(couponData)
        // 渲染维度
        this.renderXAxis(couponData)
        // 渲染列表
        this.renderSeries(couponData)

        this.chart = this.$echarts.init(this.$refs.sms_echarts)
        this.setOptions()
      })
    },
    setOptions() {
      this.chart.setOption({
        // 标题
        title: {
          text: this.title,
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        // 提示框组件
        tooltip: {
          trigger: 'axis', // 触发条件
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%', // grid 组件离容器左侧的距离。
          right: '5%', // grid 组件离容器右侧的距离。
          borderWidth: 0, // 网格的边框线宽。
          top: 100, // grid 组件离容器上侧的距离。
          bottom: 95, // grid 组件离容器下侧的距离。
          textStyle: { // 样式
            color: '#fff'
          }
        },
        // dataZoom 组件 用于区域缩放
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 30,
            start: 5,
            end: 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            borderColor: '#90979c',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: '#fff'
            }
          }, {
            // 内置型数据区域缩放组件（dataZoomInside）
            type: 'inside',
            show: true,
            height: 15,
            start: 1, // 不知用处
            end: 100
          }],
        // 图例组件。
        legend: {
          top: '3%',
          textStyle: {
            color: '#90979c',
            fontSize: '20'
          },
          data: this.legendData
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis: {
          data: this.xAxisData
        },
        // 直角坐标系 grid 中的 y 轴
        yAxis: {},
        // 系列列表 展现在图表组件中的每一组数据
        series: this.seriesData
      })
    },
    // 图例
    renderLegend(data) {
      const arr = []
      for (var i in data) {
        for (const key in data[i]) {
          if (key === 'type') {
            arr.push(data[i][key])
          }
        }
      }
      this.legendData = this.distinct(arr)
      // console.log(this.legendData)
    },
    // X轴
    renderXAxis(data) {
      const arr = []
      data.forEach(coupon => {
        for (var i in coupon) {
          if (i === 'month') {
            arr.push(coupon[i])
          }
        }
      })
      this.xAxisData = this.distinct(arr)
      // console.log(this.xAxisData)
    },
    // 数据
    renderSeries(data) {
      this.seriesData.data = []
      for (let i = 0; i < this.legendData.length; i++) {
        const series = this.legendData[i]
        const arr = []

        this.xAxisData.forEach(month => {
          let have = 0
          data.forEach(smsData => {
            if (smsData.type === series && smsData.month === month) {
              arr.push(smsData.qty)
              have = 1
            }
          })
          if (have === 0) {
            arr.push('0')
          }
        })

        const ob = {}
        ob.name = series // 系列名称
        ob.type = 'bar' // 类型 柱状/条形图
        // ob.stack = 'total' // 数据堆叠
        ob.barMaxWidth = 30 // 柱条的最大宽度
        ob.barGap = '50%' // 不同系列的柱间距离 默认30%,-100%为重叠
        ob.label = {
          show: true,
          textStyle: {
            color: 'black',
            fontSize: 16
          },
          // 标签的位置
          position: 'top',
          formatter(p) {
            return p.value > 0 ? p.value : ''
          }
        }
        ob.visualMap = {
          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        }
        ob.data = arr
        console.log(ob)
        this.seriesData.push(ob)
      }
    },
    // 数组去重
    distinct(a) {
      const arr = a
      const result = []
      const obj = {}
      for (const i of arr) {
        if (!obj[i]) {
          result.push(i)
          obj[i] = 1
        }
      }
      return result
    }
  }
}
</script>

<style>
</style>
