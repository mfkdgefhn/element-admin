/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-19 17:57:19
 * @LastEditors: anan
 * @LastEditTime: 2020-10-07 10:22:21
 */
/** When your routing table is too long, you can split it into small modules**/
/** 当路由表太长时，可以将其拆分为小模块。**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'lineChart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'mixChart', noCache: true }
    },
    {
      path: 'coupon',
      component: () => import('@/views/charts/coupon'),
      name: 'CouponChart',
      meta: { title: 'CouponChart', noCache: true }
    },
    {
      path: 'sms',
      component: () => import('@/views/charts/sms'),
      name: 'SmsChart',
      meta: { title: 'SmsChart', noCache: true }
    },
    {
      path: 'newVip',
      component: () => import('@/views/charts/newVipCharts'),
      name: 'NewVipCharts',
      meta: { title: 'NewVipCharts', noCache: true }
    },
    {
      path: 'openCardRate',
      component: () => import('@/views/charts/openCardRate'),
      name: 'openCardRate',
      meta: { title: 'openCardRate', noCache: true }
    },
    {
      path: 'proportionOfSales',
      component: () => import('@/views/charts/proportionOfSales'),
      name: 'proportionOfSales',
      meta: { title: 'proportionOfSales', noCache: true }
    },
    {
      path: 'vouWriteOff',
      component: () => import('@/views/charts/vouWriteOff'),
      name: 'vouWriteOff',
      meta: { title: 'vouWriteOff', noCache: true }
    }
  ]
}

export default chartsRouter
