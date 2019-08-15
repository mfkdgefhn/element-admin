<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24" class="seach-class">
        <el-card shadow="hover">
          <!-- 菜单栏 -->
          <searchs
            :seach-type="seachType"
            @handleFilter="handleFilter"
            @handleCreate="handleCreate"
            @handleDownload="handleDownload"
            @refresh="refresh"
          />
        </el-card>
      </el-col>

      <el-col :span="24">
        <el-card shadow="hover">
          <!-- 表格 -->
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange"
          >
            <!-- 序号 -->
            <el-table-column type="index" width="50" align="center" label="序号" />

            <!-- 公告标题 -->
            <el-table-column :label="$t('noticetable.noticeTitle')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.noticeTitle }}</span>
              </template>
            </el-table-column>

            <!-- 公告类型 -->
            <el-table-column :label="$t('noticetable.noticeType')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.noticeType }}</span>
              </template>
            </el-table-column>

            <!-- 状态 -->
            <el-table-column :label="$t('noticetable.status')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>

            <!-- 创建者 -->
            <el-table-column :label="$t('noticetable.createBy')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createBy }}</span>
              </template>
            </el-table-column>

            <!-- 创建时间 -->
            <el-table-column width="150" :label="$t('noticetable.createTime')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column
              :label="$t('noticetable.actions')"
              align="center"
              width="180"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{row}">
                <!-- 操作/编辑 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  round
                  @click="handleUpdate(row)"
                >{{ $t('noticetable.edit') }}</el-button>

                <!-- 删除 -->
                <el-popover
                  v-model="row.visible"
                  placement="top"
                  width="160"
                  style="margin-left:10px;"
                >
                  <p>你确定要删除该用户吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="handleModifyStatus(row,'deleted')"
                    >确定</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    size="mini"
                    round
                    type="danger"
                    icon="el-icon-delete"
                  >{{ $t('noticetable.delete') }}</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>

          <!-- 页码 -->
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getNoticeList"
          />
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹出层 -->
    <el-dialog
      v-el-drag-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      append-to-body
      width="900px"
    >
      <!-- visible.sync：的意思是如果子组件的属性有变化，父组件则同步过来 -->
      <!-- 表单 -->
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="margin-left:50px;"
      >
        <!-- 公告标题 -->
        <el-form-item :label="$t('noticetable.noticeTitle')" prop="configName">
          <el-input v-model="temp.noticeTitle" />
        </el-form-item>

        <!-- 公告类型 -->
        <el-form-item :label="$t('noticetable.noticeType')" prop="configKey">
          <el-input v-model="temp.noticeType" />
        </el-form-item>

        <!-- 公告内容 -->
        <el-form-item :label="$t('noticetable.noticeContent')" prop="configValue">
          <!-- 富文本组件 -->
          <editor-bar v-model="temp.noticeContent" :is-clear="isClear" @change="change" />
        </el-form-item>

        <!-- 公告状态 -->
        <el-form-item :label="$t('noticetable.status')" prop="configType">
          <el-input v-model="temp.status" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 确定 -->
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('noticetable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('noticetable.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { deleteByNoticeId, updateRoleByRoleId, fetchNoticeList, fetchPv, createNoticeArticle, updateNoticeArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import EditorBar from './WangEditor'
// import { checkMaxVal } from '@/utils/validator'
// import { format } from '@/utils/validator'
import Searchs from '@/components/Searchs'

// 弹出层dialog拖拽工具
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'ComplexTable',
  components: { Pagination, EditorBar, Searchs },
  directives: { waves, elDragDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      seachType: 'notice',
      isClear: false,
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      },
      closeOnClickModal: false,
      scopeAuthority: [
        { key: '1', value: '全部数据权限' },
        { key: '2', value: '自定数据权限' },
        { key: '3', value: '本部门数据权限' },
        { key: '4', value: '本部门及以下数据权限' }
      ],
      statusAuthority: {
        '0': '正常',
        '1': '停用'
      },
      pvData: [],
      value1: '',
      refreshButton: 'el-icon-refresh',
      tableKey: 0,
      list: null,
      visible: false,
      shenheren: true,
      total: 0,
      listLoading: true,
      dictType: [],
      listQuery: {
        page: 1,
        limit: 8,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      // sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dialogPvVisible: false,
      rules: {
        dictName: [{ required: true, message: '请输入字典名称', trigger: ['blur'] }],
        dictType: [{ required: true, message: '请输入字典类型', trigger: ['blur'] }],
        date: [{ type: 'date', message: '日期格式不对', trigger: ['blur'] }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    // 刷新按钮
    async refresh() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery = {
        page: 1,
        limit: 8
      }
      await this.getNoticeList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    change(val) {
      // console.log(val)
      this.temp.noticeContent = val
    },
    // 获取系统参数列表
    getNoticeList() {
      this.listLoading = true
      fetchNoticeList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getNoticeList()
    },
    handleModifyStatus(row, status) {
      if (status === 'discontinuation') {
        // 停用
        row.status = '1'
        updateRoleByRoleId(row).then(response => {
          this.$message({
            message: '停用',
            type: 'success'
          })
          // 抛出错误，将停用的状态更改回来
          // eslint-disable-next-line handle-callback-err
        }).catch(err => {
          row.status = '0'
        })
      } else if (status === 'enabling') {
        // 启用
        row.status = '0'
        updateRoleByRoleId(row).then(response => {
          this.$message({
            message: '启用',
            type: 'success'
          })
        })
      } else if (status === 'deleted') {
        // 删除
        row.visible = false
        deleteByNoticeId(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getNoticeList()
          }, 1 * 1000)
        })
      }
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        title: '',
        status: '0',
        notice_id: '',
        noticeTitle: '',
        noticeType: '',
        noticeContent: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.createTime = new Date()
          this.temp.updateTime = new Date()
          createNoticeArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getNoticeList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.updateTime = new Date()
          updateNoticeArticle(tempData).then(() => {
            this.dialogFormVisible = false
            this.getNoticeList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },

    // 弹出权限分配窗口
    handleFetchPv(row) {
      this.temp = Object.assign({}, row) // copy obj
      fetchPv(row).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['部门名称', '部门编码', '显示顺序', '状态', '创建时间', '修改时间', '备注']
        const filterVal = ['postName', 'postCode', 'postSort', 'status', 'createTime', 'updateTime', 'remark']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.el-dialog {
  min-width: 530px;
}
.dialog-dietRole {
  min-width: 1000px;
}
.seach-class {
  margin-bottom: 10px;
}
</style>
