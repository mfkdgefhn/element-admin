/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-19 17:57:19
 * @LastEditors: anan
 * @LastEditTime: 2019-10-05 13:51:12
 */
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Vue Element Admin' // page title
// If your port is set to 80,
// 如果端口设置为80，
// use administrator privileges to execute the command line.
// 使用管理员权限执行命令行。
// For example, Mac: sudo npm run
// 例如，mac:sudo npm run
const port = 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
// 所有配置项说明都可以在 https://cli.vuejs.org/config/ 中找到
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * 如果计划在子路径下部署站点，则需要设置publicPath，
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * 例如，Github页面。如果您计划将站点部署到https://foo.github.io/bar/，
   * then publicPath should be set to "/bar/".
   * 然后publicpath应设置为“/bar/”。
   * In most cases please use '/' !!!
   * 在大多数情况下，请使用'/'！！
   * Detail: https://cli.vuejs.org/config/#publicpath
   * 详情：https://cli.vuejs.org/config/publicpath
   */
  publicPath: '/',
  // 将构建好的文件输出到哪里
  outputDir: 'dist',
  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: 'static',
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  // 在生产构建时禁用
  lintOnSave: process.env.NODE_ENV === 'development',
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // 配置 webpack-dev-server 行为。
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // devServer.proxy 可以是一个指向开发环境 API 服务器的字符串
    proxy: {
      // change xxx-api/login => mock/login
      // 更改xxx-api/login=>mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // 详细信息：https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://192.168.10.222:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      '/echartsApi': {
        target: 'http://10.10.1.41',
        changeOrigin: true,
        pathRewrite: {
          '^/echartsApi': '/'
        }
      },
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // 在webpack的name字段中提供应用的标题，以便
    // it can be accessed in index.html to inject the correct title.
    // 可以在index.html中访问，以插入正确的标题
    // 标题
    name: name,
    // 配置快捷路径
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test TODO:需要测试
    config.plugins.delete('prefetch') // TODO: need test TODO:需要测试

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace 设置保留空白
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              // “runtime”黑色与runtimechunk名称相同。默认值为“运行时”
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent 仅打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package //将elementui拆分为单个包
                  // 权重必须大于libs和app，否则将打包成libs或app
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm // in order to adapt to cnpm 为了适应CNPM
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules 可以自定义规则
                  minChunks: 3, //  minimum common number 最小公共数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
