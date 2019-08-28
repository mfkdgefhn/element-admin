<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <!-- 登录标题 -->
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <!-- 语言图标 -->
        <lang-select class="set-language" />
      </div>

      <!-- 用户名 -->
      <el-form-item prop="userName">
        <!-- 用户名图标 -->
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userName"
          v-model="loginForm.userName"
          :placeholder="$t('login.userName')"
          name="userName"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <!-- 密码 -->
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <!-- 密码图标 -->
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <!-- 密码可见、不可见图标 -->
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <!-- 登录按钮 -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >{{ $t('login.logIn') }}</el-button>

      <!-- 下方提示 -->
      <div style="position:relative">
        <div class="tips">
          <span>{{ $t('login.userName') }} : admin</span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">{{ $t('login.userName') }} : editor</span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>

        <!-- 第三方登录 -->
        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog=true"
        >{{ $t('login.thirdparty') }}</el-button>
      </div>
    </el-form>

    <!-- 第三方登录弹窗 -->
    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <social-sign />
    </el-dialog>

    <!-- 第三方搜狐获取IP地址 -->
    <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8" />
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './components/SocialSignin'

// 获取浏览器以及操作系统
import getBrowseInfo from '@/utils/getBrowseInfo'

export default {
  name: 'Login',
  components: {
    LangSelect,
    SocialSign,
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }})
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不得少于6位数!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: 'admin',
        password: '123456',
        loginIp: '',
        loginLocation: '',
        browser: '',
        os: '',
        msg: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', message: '请输入用户名' }], // validator: validateUsername
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      browseInfo: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.userName === '') {
      this.$refs.userName.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录动作
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // eslint-disable-next-line no-undef
          this.loginForm.loginIp = returnCitySN['cip']
          // eslint-disable-next-line no-undef
          this.loginForm.loginLocation = returnCitySN['cname']
          this.browseInfo = getBrowseInfo()
          this.loginForm.os = this.browseInfo[0]
          this.loginForm.browser = this.browseInfo[1] + ' ' + this.browseInfo[2].split(' ')[0]

          // console.log(this.getBrowserInfo())
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              // this.$router.push('/401')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
              console.log(123)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 获取操作系统，浏览器信息
    getBrowserInfo1() {
      var agent = navigator.userAgent.toLowerCase()
      var arr = []
      var system = agent.split(' ')[1].split(' ')[0].split('(')[1]
      arr.push(system)
      var regStr_edge = /edge\/[\d.]+/gi
      var regStr_ie = /trident\/[\d.]+/gi
      var regStr_ff = /firefox\/[\d.]+/gi
      var regStr_chrome = /chrome\/[\d.]+/gi
      var regStr_saf = /safari\/[\d.]+/gi
      var regStr_opera = /opr\/[\d.]+/gi
      // IE
      if (agent.indexOf('trident') > 0) {
        arr.push(agent.match(regStr_ie)[0].split('/')[0])
        arr.push(agent.match(regStr_ie)[0].split('/')[1])
        return arr
      }
      // Edge
      if (agent.indexOf('edge') > 0) {
        arr.push(agent.match(regStr_edge)[0].split('/')[0])
        arr.push(agent.match(regStr_edge)[0].split('/')[1])
        return arr
      }
      // firefox
      if (agent.indexOf('firefox') > 0) {
        arr.push(agent.match(regStr_ff)[0].split('/')[0])
        arr.push(agent.match(regStr_ff)[0].split('/')[1])
        return arr
      }
      // Opera
      if (agent.indexOf('opr') > 0) {
        arr.push(agent.match(regStr_opera)[0].split('/')[0])
        arr.push(agent.match(regStr_opera)[0].split('/')[1])
        return arr
      }
      // Safari
      if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
        arr.push(agent.match(regStr_saf)[0].split('/')[0])
        arr.push(agent.match(regStr_saf)[0].split('/')[1])
        return arr
      }
      // Chrome
      if (agent.indexOf('chrome') > 0) {
        arr.push(agent.match(regStr_chrome)[0].split('/')[0])
        arr.push(agent.match(regStr_chrome)[0].split('/')[1])
        return arr
      } else {
        arr.push('请更换主流浏览器，例如chrome,firefox,opera,safari,IE,Edge!')
        return arr
      }
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
