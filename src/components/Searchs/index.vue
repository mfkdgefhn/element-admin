<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-19 17:57:19
 * @LastEditors: anan
 * @LastEditTime: 2019-09-23 11:08:56
 -->
<template>
  <!-- 菜单栏 -->
  <div class="seach-length">
    <!-- 用户开始 -->
    <div v-if="seachType==='user'">
      <!-- 用户名 -->
      <el-input
        v-model="listQuery.userName"
        :placeholder="$t('usertable.userName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 昵称 -->
      <el-input
        v-model="listQuery.userNick"
        :placeholder="$t('usertable.userNick')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 手机号 -->
      <el-input
        v-model="listQuery.phonenumber"
        :placeholder="$t('usertable.phonenumber')"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- 用户状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('usertable.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 角色开始 -->
    <div v-if="seachType==='role'">
      <!-- 角色名称 -->
      <el-input
        v-model="listQuery.roleName"
        :placeholder="$t('roletable.roleName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 权限字符 -->
      <el-input
        v-model="listQuery.roleKey"
        :placeholder="$t('roletable.roleKey')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- 角色状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('roletable.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 创建时间 -->
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="-"
        :start-placeholder="$t('currency.startDate')"
        :end-placeholder="$t('currency.endDate')"
        style="width:250px;padding:0px 10px;"
        value-format="yyyyMMdd"
      />

      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <!-- 这里操作日志没有这个按钮 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>

      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 菜单开始 -->
    <div v-if="seachType==='menu'">
      <!-- 菜单名称 -->
      <el-input
        v-model="listQuery.menuName"
        :placeholder="$t('menutable.menuName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 菜单状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('currency.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <!-- 这里操作日志没有这个按钮 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 部门开始 -->
    <div v-if="seachType==='dept'">
      <!-- 部门名称 -->
      <el-input
        v-model="listQuery.deptName"
        :placeholder="$t('depttable.deptName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 部门状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('depttable.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <!-- 这里操作日志没有这个按钮 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 岗位开始 -->
    <div v-if="seachType==='post'">
      <!-- 岗位编码 -->
      <el-input
        v-model="listQuery.postCode"
        :placeholder="$t('posttable.postCode')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 岗位名称 -->
      <el-input
        v-model="listQuery.postName"
        :placeholder="$t('posttable.postName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 岗位状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('posttable.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <!-- 这里操作日志没有这个按钮 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 字典管理 -->
    <div v-if="seachType==='dictionary'">
      <!-- 字典名称 -->
      <el-input
        v-model="listQuery.dictName"
        :placeholder="$t('dictionarytable.dictName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 字典类型 -->
      <el-input
        v-model="listQuery.dictType"
        :placeholder="$t('dictionarytable.dictType')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 岗位状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('dictionarytable.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 创建时间 -->
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="-"
        :start-placeholder="$t('dictionarytable.startDate')"
        :end-placeholder="$t('dictionarytable.endDate')"
        style="width:250px;padding:0px 10px;"
        value-format="yyyyMMdd"
      />
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <!-- 这里操作日志没有这个按钮 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 字典数据 -->
    <div v-if="seachType==='dictdata'">
      <!-- 字典名称 -->
      <el-select v-model="listQuery.dictType" placeholder="请选择字典类型">
        <el-option
          v-for="item in dictType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- 字典标签 -->
      <el-input
        v-model="listQuery.dictLabel"
        :placeholder="$t('dictdatatable.dictLabel')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 字典状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('dictdatatable.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <!-- 这里操作日志没有这个按钮 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 参数开始 -->
    <div v-if="seachType==='config'">
      <!-- 参数名称 -->
      <el-input
        v-model="listQuery.configName"
        :placeholder="$t('configtable.configName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 参数键名 -->
      <el-input
        v-model="listQuery.configKey"
        :placeholder="$t('configtable.configKey')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 系统内置 -->
      <el-input
        v-model="listQuery.configType"
        :placeholder="$t('configtable.configType')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 创建时间 -->
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="-"
        :start-placeholder="$t('dictionarytable.startDate')"
        :end-placeholder="$t('dictionarytable.endDate')"
        style="width:250px;padding:0px 10px;"
        value-format="yyyyMMdd"
      />
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <!-- 这里操作日志没有这个按钮 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 公告开始 -->
    <div v-if="seachType==='notice'">
      <!-- 公告标题 -->
      <el-input
        v-model="listQuery.noticeTitle"
        :placeholder="$t('noticetable.noticeTitle')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 操作人员 -->
      <el-input
        v-model="listQuery.createBy"
        :placeholder="$t('noticetable.createBy')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 公告类型 -->
      <el-input
        v-model="listQuery.noticeType"
        :placeholder="$t('noticetable.noticeType')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 添加 -->
      <!-- 这里操作日志没有这个按钮 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('currency.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>

    <!-- 操作日志开始 -->
    <div v-if="seachType==='operlog'">
      <!-- 系统模块 -->
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('operlogtable.title')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 操作人员 -->
      <el-input
        v-model="listQuery.operName"
        :placeholder="$t('operlogtable.operName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 操作类型 -->
      <el-input
        v-model="listQuery.operatorType"
        :placeholder="$t('operlogtable.operatorType')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 操作状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('operlogtable.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 操作时间 -->
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="-"
        :start-placeholder="$t('operlogtable.startDate')"
        :end-placeholder="$t('operlogtable.endDate')"
        style="width:250px;padding:0px 10px;"
        value-format="yyyyMMdd"
      />
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>
      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />

      <!-- 清空 -->
      <el-popover v-model="visible" placement="top" width="250">
        <p>
          <span style="color:red;font-weight:900;display:block;font-size:20px">(危险操作)</span>
          你确定要清空日志吗？
        </p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="empty()">确定</el-button>
        </div>
        <!-- <el-button slot="reference">删除</el-button> -->
        <el-button slot="reference" type="danger" icon="el-icon-delete" circle />
      </el-popover>
    </div>

    <!-- 登陆日志开始 -->
    <div v-if="seachType==='loginlog'">
      <!-- 登录地址 -->
      <el-input
        v-model="listQuery.loginLocation"
        :placeholder="$t('loginlogtable.loginLocation')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 登录名称 -->
      <el-input
        v-model="listQuery.loginName"
        :placeholder="$t('loginlogtable.loginName')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 登录状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('loginlogtable.status')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 登录时间 -->
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="-"
        :start-placeholder="$t('loginlogtable.startDate')"
        :end-placeholder="$t('loginlogtable.endDate')"
        style="width:250px;padding:0px 10px;"
        value-format="yyyyMMdd"
      />

      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('currency.export') }}</el-button>

      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />

      <!-- 清空 -->
      <el-popover v-model="visible" placement="top" width="160">
        <p>
          <span style="color:red;font-weight:900;display:block;font-size:20px">(危险操作)</span>
          你确定要清空日志吗？
        </p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="empty()">确定</el-button>
        </div>
        <!-- <el-button slot="reference">删除</el-button> -->
        <el-button slot="reference" type="danger" icon="el-icon-delete" circle />
      </el-popover>
    </div>

    <!-- 操作用户   查询所有在线    包含游客用户 -->

    <!-- 在线用户  onlineUsers -->
    <div v-if="seachType==='onlineUsers'">
      <!-- 操作用户 -->
      <el-input
        v-model="listQuery.operationUser"
        style="width: 200px;"
        :placeholder="$t('onlineUsers.operationUser')"
        class="input-with-select"
        @keyup.enter.native="handleFilter"
      >
        <el-button slot="append" icon="el-icon-search" />
      </el-input>

      <!-- 查询所有在线 -->
      <el-checkbox-group v-model="listQuery.queryAllOnline" class="checkbox-group">
        <el-checkbox :label="$t('onlineUsers.queryAllOnline')" />
      </el-checkbox-group>

      <!-- 包含游客用户 -->
      <el-checkbox-group v-model="listQuery.includingVisitorUsers" class="checkbox-group">
        <el-checkbox :label="$t('onlineUsers.includingVisitorUsers')" />
      </el-checkbox-group>

      <!-- 查询所有在线 -->
      <!-- <el-input
        v-model="listQuery.loginName"
        :placeholder="$t('onlineUsers.queryAllOnline')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />-->

      <!-- 包含游客用户 -->
      <!-- <el-input
        v-model="listQuery.status"
        :placeholder="$t('onlineUsers.includingVisitorUsers')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />-->

      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('currency.search') }}</el-button>

      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refresh()" />
    </div>
  </div>
</template>

<script>

import waves from '@/directive/waves' // waves directive

export default {
  directives: { waves },
  props: {
    // listQuery: {
    //   type: Object,
    //   default: () => { }
    // },
    seachType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      dictType: [],
      value1: '',
      refreshButton: 'el-icon-refresh',
      downloadLoading: false,
      listQuery: {}
    }
  },
  watch: {
    value1(data) {
      this.listQuery.startDate = data[0]
      this.listQuery.endDate = data[1]
    }
  },
  methods: {
    handleFilter() {
      console.log(this.listQuery)
      this.$emit('handleFilter', this.listQuery)
    },
    handleCreate() {
      this.$emit('handleCreate', this.listQuery)
    },
    handleDownload() {
      this.$emit('handleDownload', this.listQuery)
    },
    refresh() {
      this.$emit('refresh', this.listQuery)
    }
  }
}
</script>

<style>
.seach-length {
  min-width: 870px;
}
.checkbox-group {
  display: inline-table;
  margin-left: 10px;
}
</style>
