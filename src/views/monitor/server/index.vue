<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-23 13:39:53
 * @LastEditors: anan
 * @LastEditTime: 2019-09-26 18:01:17
 -->
<template>
  <div class="server">
    <el-row type="flex" class="row-bg" justify="space-around" :gutter="20">
      <!-- cpu信息 -->
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card body-style="padding:0px;" shadow="hover">
            <div slot="header" class="clearfix">
              <svg-icon icon-class="CPU" />
              <span>CPU</span>
              <el-button style="float: right; padding: 0" type="text">
                <!-- <svg-icon style="font-size:20px;" icon-class="Rectangle" /> -->
                <i class="el-icon-remove-outline" />
              </el-button>
            </div>
            <vxe-table
              stripe
              :data="cpuData"
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

      <!-- memory信息 -->
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-card body-style="padding:0px;" shadow="hover">
            <div slot="header" class="clearfix">
              <svg-icon icon-class="Memory" />
              <span>内存</span>
              <el-button style="float: right; padding: 0" type="text">
                <!-- <svg-icon style="font-size:20px;" icon-class="Rectangle" /> -->
                <i class="el-icon-remove-outline" />
              </el-button>
            </div>
            <vxe-table
              stripe
              :data="memData"
              highlight-current-row
              highlight-hover-row
              size="mini"
              align="center"
            >
              <vxe-table-column field="info" title="属性" />
              <vxe-table-column field="memory" title="内存" />
              <vxe-table-column field="jvm" title="JVM" />
            </vxe-table>
          </el-card>
        </div>
      </el-col>

      <!-- zai信息 -->
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card body-style="padding:0px;" shadow="hover">
            <div slot="header" class="clearfix">
              <svg-icon icon-class="cheap" />
              <span>堆/非堆</span>
              <el-button style="float: right; padding: 0" type="text">
                <!-- <svg-icon style="font-size:20px;" icon-class="Rectangle" /> -->
                <i class="el-icon-remove-outline" />
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

    <!-- server信息 -->
    <el-row class="row-bg">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="server" />
            <span>服务器信息</span>
            <el-button style="float: right; padding: 0" type="text">
              <!-- <svg-icon style="font-size:20px;" icon-class="Rectangle" /> -->
              <i class="el-icon-remove-outline" @click="close('server')" />
            </el-button>
          </div>
          <transition-group name="el-fade-in-linear">
            <el-row :class="rowserver">
              <el-col :span="4">服务器名称：</el-col>
              <el-col :span="8">{{ property.serverName }}</el-col>
              <el-col :span="4">操作系统:</el-col>
              <el-col :span="8">{{ property.server }}</el-col>
            </el-row>
            <el-row :class="rowserver">
              <el-col :span="4">服务器IP：</el-col>
              <el-col :span="8">{{ property.serverIp }}</el-col>
              <el-col :span="4">系统架构:</el-col>
              <el-col :span="8">{{ property.architecture }}</el-col>
            </el-row>
          </transition-group>
        </el-card>
      </el-col>
    </el-row>

    <!-- JVM信息 -->
    <el-row class="row-bg">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="jvm" />
            <span>Java虚拟机信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <!-- <svg-icon style="font-size:20px;" icon-class="Rectangle" /> -->
              <i class="el-icon-remove-outline" />
            </el-button>
          </div>
          <el-row>
            <el-col :span="4">Java名称:</el-col>
            <el-col :span="8">{{ property.javaName }}</el-col>
            <el-col :span="4">Java版本:</el-col>
            <el-col :span="8">{{ property.javaVersion }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">启动时间:</el-col>
            <el-col :span="8">{{ property.javaStartTime }}</el-col>
            <el-col :span="4">运行时长:</el-col>
            <el-col :span="8">{{ property.javaRunTime }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">安装路径:</el-col>
            <el-col :span="20">{{ property.javaInstallPath }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">启动参数:</el-col>
            <el-col :span="20">{{ property.javaStartParm }}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- Platform信息 -->
    <el-row class="row-bg">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="platConfig" />
            <span>平台参数</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <!-- <svg-icon style="font-size:20px;" icon-class="Rectangle" /> -->
              <i class="el-icon-remove-outline" />
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

    <!-- disk信息 -->
    <el-row class="row-bg">
      <el-col :span="24">
        <el-card body-style="padding:0px;" shadow="hover">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="diskStatus" />
            <span>磁盘状态</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <!-- <svg-icon style="font-size:20px;" icon-class="Rectangle" /> -->
              <i class="el-icon-remove-outline" />
            </el-button>
          </div>
          <vxe-table
            stripe
            :data="fileData"
            class="table-card"
            highlight-current-row
            highlight-hover-row
            size="mini"
            align="center"
          >
            <vxe-table-column type="index" width="60" />
            <vxe-table-column field="diskHost" title="盘符路径" />
            <vxe-table-column field="fineSys" title="文件系统" />
            <vxe-table-column field="diskTypeName" title="盘符类型" />
            <vxe-table-column field="totalSize" title="总大小" />
            <vxe-table-column field="svailableSize" title="可用大小" />
            <vxe-table-column field="usedSize" title="已用大小" />
            <vxe-table-column field="percentageUsed" title="已用百分比" />
          </vxe-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getServerConfig } from '@/api/article'

export default {
  data() {
    return {
      tableData: [],
      cpuData: [],
      memData: [],
      property: {},
      fileData: [],
      rowserver: ''
    }
  },
  mounted() {
    this.inifVue()
  },
  methods: {
    close(data) {
      if (this.rowserver === '') { this.rowserver = 'rowserver' } else { this.rowserver = '' }
      console.log(data)
    },
    inifVue() {
      console.log('开始加载系统数据')
      getServerConfig().then(response => {
        this.cpuData = response.data.cpu
        this.memData = response.data.mem
        this.property = response.data.property[0]
        this.fileData = response.data.file
      })
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
svg {
  color: #6db9ff;
}
.rowserver {
  display: none;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
