<template>
  <!-- 菜单栏 -->
  <div class="filter-container">
    <!-- 用户开始 -->
    <!-- 用户名 -->
    <el-input
      v-if="listQuery.userName"
      v-model="listQuery.userName"
      :placeholder="$t('usertable.userName')"
      style="width: 150px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 昵称 -->
    <el-input
      v-if="listQuery.userNick"
      v-model="listQuery.userNick"
      :placeholder="$t('usertable.userNick')"
      style="width: 150px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 手机号 -->
    <el-input
      v-if="listQuery.phonenumber"
      v-model="listQuery.phonenumber"
      :placeholder="$t('usertable.phonenumber')"
      style="width: 150px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 角色开始 -->
    <!-- 角色名称 -->
    <el-input
      v-if="listQuery.roleName"
      v-model="listQuery.roleName"
      :placeholder="$t('roletable.roleName')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 权限字符 -->
    <el-input
      v-if="listQuery.roleKey"
      v-model="listQuery.roleKey"
      :placeholder="$t('roletable.roleKey')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 菜单开始 -->
    <!-- 菜单名称 -->
    <el-input
      v-if="listQuery.menuName"
      v-model="listQuery.menuName"
      :placeholder="$t('menutable.menuName')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 菜单状态 -->
    <el-input
      v-if="listQuery.visible"
      v-model="listQuery.visible"
      :placeholder="$t('menutable.visible')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 部门开始 -->
    <!-- 部门名称 -->
    <el-input
      v-if="listQuery.deptName"
      v-model="listQuery.deptName"
      :placeholder="$t('depttable.deptName')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 部门状态 -->
    <el-input
      v-if="listQuery.status"
      v-model="listQuery.status"
      :placeholder="$t('depttable.status')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 岗位开始 -->
    <!-- 岗位编码 -->
    <el-input
      v-if="listQuery.postCode"
      v-model="listQuery.postCode"
      :placeholder="$t('posttable.postCode')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 岗位名称 -->
    <el-input
      v-if="listQuery.postName"
      v-model="listQuery.postName"
      :placeholder="$t('posttable.postName')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 岗位状态 -->
    <el-input
      v-if="listQuery.status"
      v-model="listQuery.status"
      :placeholder="$t('posttable.status')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 字典开始 -->
    <!-- 字典名称 -->
    <el-input
      v-if="listQuery.dictName"
      v-model="listQuery.dictName"
      :placeholder="$t('dicttypetable.dictName')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 字典类型 -->
    <el-input
      v-if="listQuery.dictType"
      v-model="listQuery.dictType"
      :placeholder="$t('dicttypetable.dictType')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 岗位状态 -->
    <el-input
      v-if="listQuery.status"
      v-model="listQuery.status"
      :placeholder="$t('dicttypetable.status')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 创建时间 -->
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="-"
      :start-placeholder="$t('dicttypetable.startDate')"
      :end-placeholder="$t('dicttypetable.endDate')"
      style="width:250px;padding:0px 10px;"
      value-format="yyyyMMdd"
    />

    <!-- 字典开始 -->
    <!-- 字典名称 -->
    <el-select v-if="listQuery.dictType" v-model="listQuery.dictType" placeholder="请选择字典类型">
      <el-option
        v-for="item in dictType"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <!-- 字典标签 -->
    <el-input
      v-if="listQuery.dictLabel"
      v-model="listQuery.dictLabel"
      :placeholder="$t('dictdatatable.dictLabel')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 字典状态 -->
    <el-input
      v-if="listQuery.status"
      v-model="listQuery.status"
      :placeholder="$t('dictdatatable.status')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 参数开始 -->
    <!-- 参数名称 -->
    <el-input
      v-if="listQuery.configName"
      v-model="listQuery.configName"
      :placeholder="$t('configtable.configName')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 参数键名 -->
    <el-input
      v-if="listQuery.configKey"
      v-model="listQuery.configKey"
      :placeholder="$t('configtable.configKey')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 系统内置 -->
    <el-input
      v-if="listQuery.configType"
      v-model="listQuery.configType"
      :placeholder="$t('configtable.configType')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 创建时间 -->
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="-"
      :start-placeholder="$t('dicttypetable.startDate')"
      :end-placeholder="$t('dicttypetable.endDate')"
      style="width:250px;padding:0px 10px;"
      value-format="yyyyMMdd"
    />

    <!-- 公告开始 -->
    <!-- 公告标题 -->
    <el-input
      v-if="listQuery.noticeTitle"
      v-model="listQuery.noticeTitle"
      :placeholder="$t('noticetable.noticeTitle')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 操作人员 -->
    <el-input
      v-if="listQuery.createBy"
      v-model="listQuery.createBy"
      :placeholder="$t('noticetable.createBy')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 公告类型 -->
    <el-input
      v-if="listQuery.noticeType"
      v-model="listQuery.noticeType"
      :placeholder="$t('noticetable.noticeType')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 操作日志开始 -->
    <!-- 系统模块 -->
    <el-input
      v-if="listQuery.title"
      v-model="listQuery.title"
      :placeholder="$t('operlogtable.title')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 操作人员 -->
    <el-input
      v-if="listQuery.operName"
      v-model="listQuery.operName"
      :placeholder="$t('operlogtable.operName')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 操作类型 -->
    <el-input
      v-if="listQuery.operatorType"
      v-model="listQuery.operatorType"
      :placeholder="$t('operlogtable.operatorType')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 操作状态 -->
    <el-input
      v-if="listQuery.status"
      v-model="listQuery.status"
      :placeholder="$t('operlogtable.status')"
      style="width: 200px;"
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

    <!-- 登陆日志开始 -->
    <!-- 登录地址 -->
    <el-input
      v-if="listQuery.loginLocation"
      v-model="listQuery.loginLocation"
      :placeholder="$t('loginlogtable.loginLocation')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 登录名称 -->
    <el-input
      v-if="listQuery.loginName"
      v-model="listQuery.loginName"
      :placeholder="$t('loginlogtable.loginName')"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />

    <!-- 登录状态 -->
    <el-input
      v-if="listQuery.status"
      v-model="listQuery.status"
      :placeholder="$t('loginlogtable.status')"
      style="width: 200px;"
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

    <!-- 按钮开始 -->
    <!-- 搜索按钮 -->
    <el-button
      v-waves
      class="filter-item"
      type="primary"
      icon="el-icon-search"
      @click="handleFilter"
    >{{ $t('search.search') }}</el-button>

    <!-- 添加 -->
    <!-- 这里操作日志没有这个按钮 -->
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      @click="handleCreate"
    >{{ $t('search.add') }}</el-button>

    <!-- 导出 -->
    <el-button
      v-waves
      :loading="downloadLoading"
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="handleDownload"
    >{{ $t('search.export') }}</el-button>

    <!-- 刷新 -->
    <el-button type="primary" :icon="refreshButton" circle @click="refreshUserList()" />

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
</template>

<script>
export default {
  props: {
    listQuery: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style>
</style>
