<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-23 13:39:53
 * @LastEditors: anan
 * @LastEditTime: 2019-09-23 17:33:52
 -->
<template>
  <div class="server">
    <el-row type="flex" class="row-bg" justify="space-around" :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card body-style="padding:0px;">
            <div slot="header" class="clearfix">
              <svg-icon icon-class="CPU" />
              <span>CPU</span>
              <el-button style="float: right; padding: 0" type="text">
                <svg-icon style="font-size:20px;" icon-class="Rectangle" />
              </el-button>
            </div>
            <vxe-table
              stripe
              :data="tableData"
              class="table-card"
              highlight-current-row
              highlight-hover-row
              size="mini"
              align="center"
            >
              <vxe-table-column field="info" title="属性" />
              <vxe-table-column field="value" title="值" />
            </vxe-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-card body-style="padding:0px;">
            <div slot="header" class="clearfix">
              <svg-icon icon-class="Memory" />
              <span>内存</span>
              <el-button style="float: right; padding: 0" type="text">
                <svg-icon style="font-size:20px;" icon-class="Rectangle" />
              </el-button>
            </div>
            <vxe-table
              stripe
              :data="tableData"
              highlight-current-row
              highlight-hover-row
              size="mini"
              align="center"
            >
              <vxe-table-column field="info" title="属性" />
              <vxe-table-column field="Memory" title="内存" />
              <vxe-table-column field="jvm" title="JVM" />
            </vxe-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card body-style="padding:0px;">
            <div slot="header" class="clearfix">
              <svg-icon icon-class="cheap" />
              <span>堆/非堆</span>
              <el-button style="float: right; padding: 0" type="text">
                <svg-icon style="font-size:20px;" icon-class="Rectangle" />
              </el-button>
            </div>
            <vxe-table
              stripe
              :data="tableData"
              class="table-card"
              highlight-current-row
              highlight-hover-row
              size="mini"
              align="center"
            >
              <vxe-table-column field="info" title="属性" />
              <vxe-table-column field="heap" title="堆" />
              <vxe-table-column field="notheap" title="非堆" />
            </vxe-table>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="server" />
            <span>服务器信息</span>
            <el-button style="float: right; padding: 0" type="text">
              <svg-icon style="font-size:20px;" icon-class="Rectangle" />
            </el-button>
          </div>
          <el-row>
            <el-col :span="4">服务器名称：</el-col>
            <el-col :span="8">1</el-col>
            <el-col :span="4">操作系统:</el-col>
            <el-col :span="8">2</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">服务器IP：</el-col>
            <el-col :span="8">1</el-col>
            <el-col :span="4">系统架构:</el-col>
            <el-col :span="8">2</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="jvm" />
            <span>Java虚拟机信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <svg-icon style="font-size:20px;" icon-class="Rectangle" />
            </el-button>
          </div>
          <el-row>
            <el-col :span="4">Java名称:</el-col>
            <el-col :span="8">1</el-col>
            <el-col :span="4">Java版本:</el-col>
            <el-col :span="8">2</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">启动时间:</el-col>
            <el-col :span="8">1</el-col>
            <el-col :span="4">运行时长:</el-col>
            <el-col :span="8">2</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">安装路径:</el-col>
            <el-col :span="20">1</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">启动参数:</el-col>
            <el-col :span="20">1</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="platConfig" />
            <span>平台参数</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <svg-icon style="font-size:20px;" icon-class="Rectangle" />
            </el-button>
          </div>
          <el-row>
            <el-col :span="4">当前工作路径:</el-col>
            <el-col :span="20">1</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">日志存放路径:</el-col>
            <el-col :span="20">1</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">上传文件路径:</el-col>
            <el-col :span="20">1</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="24">
        <el-card body-style="padding:0px;">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="diskStatus" />
            <span>磁盘状态</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <svg-icon style="font-size:20px;" icon-class="Rectangle" />
            </el-button>
          </div>
          <vxe-table
            stripe
            :data="tableData"
            class="table-card"
            highlight-current-row
            highlight-hover-row
            size="mini"
            align="center"
          >
            <vxe-table-column type="index" width="60" />
            <vxe-table-column field="diskHost" title="盘符路径" />
            <vxe-table-column field="fineSys" title="文件系统" />
            <vxe-table-column field="diskType" title="盘符类型" />
            <vxe-table-column field="totalSize" title="总大小" />
            <vxe-table-column field="svailableSize" title="可用大小" />
            <vxe-table-column field="usedSize" title="已用大小" />
            <vxe-table-column field="usedSize" title="已用百分比" />
            <vxe-table-column field="percentageUsed" title="已用百分比" />
          </vxe-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.inifVue()
  },
  methods: {
    inifVue() {
      console.log(1)
    }
  }
}
</script>

<style scoped>
.server {
  padding: 20px;
}
.row-bg {
  margin-bottom: 1.25rem;
}
/* .el-card__body {
  padding: 0px;
} */
.table-card {
  padding: 0px;
}
</style>
