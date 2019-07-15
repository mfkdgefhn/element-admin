import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

/**
 * How to use
 * 如何使用
 * <el-table height="100px" v-el-height-adaptive-table="{bottomOffset: 30}">...</el-table>
 * el-table height is must be set
 * 必须设置桌子高度
 * bottomOffset: 30(default)   // The height of the table from the bottom of the page.
 * //表距页面底部的高度。
 */

const doResize = (el, binding, vnode) => {
  const { componentInstance: $table } = vnode

  const { value } = binding

  if (!$table.height) {
    throw new Error(`el-$table must set the height. Such as height='100px'`)
  }
  const bottomOffset = (value && value.bottomOffset) || 30

  if (!$table) return

  const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  $table.layout.setHeight(height)
  $table.doLayout()
}

export default {
  bind(el, binding, vnode) {
    el.resizeListener = () => {
      doResize(el, binding, vnode)
    }
    // parameter 1 is must be "Element" type
    addResizeListener(window.document.body, el.resizeListener)
  },
  inserted(el, binding, vnode) {
    doResize(el, binding, vnode)
  },
  unbind(el) {
    removeResizeListener(window.document.body, el.resizeListener)
  }
}
