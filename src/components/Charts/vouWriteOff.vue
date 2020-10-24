<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-19 17:57:19
 * @LastEditors: anan
 * @LastEditTime: 2020-10-07 11:45:49
 -->
<template>
  <div :id="id" ref="mix_echarts" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from './mixins/resize'
import { getVouWriteOffs } from '@/api/echarts' // getCoupon,

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
      default: '购物券核销情况'
    }
  },
  data() {
    return {
      chart: null,
      legendData: [],
      seriesData: [],
      xAxisData: []
    }
  },
  watch: {
    seriesData(val, oldVal) {
      // console.log(1111, val, oldVal)
      // this.setOptions(val)
    }
  },
  mounted() {
    this.initCharts()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initCharts() {
      getVouWriteOffs().then(response => {
        const vouWriteOffs = response.data
        // 渲染图例组件
        this.renderLegend(vouWriteOffs)
        // 渲染维度
        this.renderXAxis(vouWriteOffs)
        // 渲染列表
        this.renderSeries(vouWriteOffs)
        // 获取图表div
        this.chart = this.$echarts.init(this.$refs.mix_echarts)
        // 设置并渲染图表
        this.setOptions()
      })
    },
    // 渲染图例组件
    renderLegend(data) {
      data.forEach(proportion => {
        if (!this.legendData.includes(proportion.name)) {
          this.legendData.push(proportion.name)
        }
      })
    },
    // 渲染维度
    renderXAxis(data) {
      data.forEach(proportion => {
        if (proportion.name === this.legendData[0]) {
          this.xAxisData.push(proportion.yearMonth)
        }
      })
    },
    // 渲染列表
    renderSeries(data) {
      debugger
      this.seriesData.data = []
      for (let i = 0; i < this.legendData.length; i++) {
        const series = this.legendData[i]
        const arr = []
        const arr1 = []
        data.forEach(proportion => {
          if (proportion.name === series) {
            arr.push(proportion.verifyed)
            arr1.push(proportion.sumCount)
          }
        })

        const ob = {}
        ob.name = series // 系列名称
        ob.type = 'line' // 类型 柱状/条形图
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
          position: 'top'
        }
        ob.data = arr
        console.log(ob)
        this.seriesData.push(ob)

        const ob1 = {}
        ob1.name = series // 系列名称
        ob1.type = 'bar' // 类型 柱状/条形图
        // ob.stack = 'total' // 数据堆叠
        ob1.barMaxWidth = 30 // 柱条的最大宽度
        ob1.barGap = '50%' // 不同系列的柱间距离 默认30%,-100%为重叠
        ob1.label = {
          show: true,
          textStyle: {
            color: 'black',
            fontSize: 16
          },
          // 标签的位置
          position: 'top'
        }
        ob1.data = arr1
        console.log(ob1)
        this.seriesData.push(ob1)
      }
    },
    // 设置并渲染图表
    setOptions(series) {
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
        color: ['#E87C25', '#27727B', '#Ff4463'],
        // 提示框组件
        tooltip: {
          trigger: 'axis', // 触发条件
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        // 绘图网格
        grid: {
          left: '5%', // grid 组件离容器左侧的距离。
          right: '5%', // grid 组件离容器右侧的距离。
          borderWidth: 0, // 网格的边框线宽。
          top: 100, // grid 组件离容器上侧的距离。
          bottom: 95, // grid 组件离容器下侧的距离。
          textStyle: {
            // 样式
            color: '#fff'
          }
        },
        // dataZoom 组件 用于区域缩放
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
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
          },
          {
            // 内置型数据区域缩放组件（dataZoomInside）
            type: 'inside',
            show: true,
            height: 15,
            start: 1, // 不知用处
            end: 100
          }
        ],
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
          axisLabel: {
            fontSize: 16
          },
          data: this.xAxisData
        },
        // 直角坐标系 grid 中的 y 轴
        yAxis: {},
        // 系列列表 展现在图表组件中的每一组数据
        series: this.seriesData
      })
    }
  }
}
</script>
