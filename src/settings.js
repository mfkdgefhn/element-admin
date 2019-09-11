/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-07-13 13:52:51
 */
module.exports = {
  title: '纸鹤视界',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   * 是否显示设置右面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   * 是否需要TagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   * 是否固定收割台
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   * 是否在边栏中显示徽标
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * 需要显示错误日志组件。
   * The default is only used in the production env
   * 默认值仅在生产环境中使用
   * If you want to also use it in dev, you can pass ['production', 'development']
   * 如果您还想在dev中使用它，可以通过['production','development']
   */
  errorLog: 'production'
}
