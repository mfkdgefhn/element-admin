/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-20 13:29:58
 * @LastEditors: anan
 * @LastEditTime: 2019-09-20 13:29:58
 */
const req = require.context('@/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default svgIcons
