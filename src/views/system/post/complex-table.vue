<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:52
 * @LastEditors: anan
 * @LastEditTime: 2019-09-12 13:27:48
 -->
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
            <el-table-column type="index" width="40" align="center" />

            <!-- 岗位编码 -->
            <el-table-column :label="$t('posttable.postCode')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.postCode }}</span>
              </template>
            </el-table-column>

            <!-- 岗位名称 -->
            <el-table-column :label="$t('posttable.postName')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.postName }}</span>
              </template>
            </el-table-column>

            <!-- 显示顺序 -->
            <el-table-column :label="$t('posttable.postSort')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.postSort }}</span>
              </template>
            </el-table-column>

            <!-- 状态 -->
            <el-table-column :label="$t('posttable.status')" align="center">
              <template slot-scope="scope">
                <el-tag
                  effect="Plain"
                  :type="scope.row.status | statusFilter"
                >{{ statusAuthority[scope.row.status] }}</el-tag>
              </template>
            </el-table-column>

            <!-- 创建时间 -->
            <el-table-column :label="$t('posttable.createTime')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column
              :label="$t('posttable.actions')"
              align="center"
              width="150"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{row}">
                <!-- 操作/编辑 -->
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(row)" />
                </el-tooltip>

                <!-- 删除 -->
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
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
                    <el-button slot="reference" circle type="danger" icon="el-icon-delete" />
                  </el-popover>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <!-- 页码 -->
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getPostList"
          />
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹出层 -->
    <el-dialog v-el-drag-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <!-- visible.sync：的意思是如果子组件的属性有变化，父组件则同步过来 -->
      <!-- 表单 -->
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- 岗位编号 -->
        <!-- <el-form-item :label="$t('posttable.postId')">
          <el-input v-model="temp.postId" disabled placeholder="系统默认生成" />
        </el-form-item>-->

        <!-- 岗位名称 -->
        <el-form-item :label="$t('posttable.postName')" prop="postName">
          <el-input v-model="temp.postName" />
        </el-form-item>

        <!-- 岗位编码 -->
        <el-form-item :label="$t('posttable.postCode')" prop="postCode">
          <el-input v-model="temp.postCode" />
        </el-form-item>

        <!-- 显示顺序 -->
        <el-form-item :label="$t('posttable.postSort')" prop="postSort">
          <el-input v-model.number="temp.postSort" />
        </el-form-item>

        <!-- 状态 -->
        <el-form-item :label="$t('posttable.status')">
          <el-select v-model="temp.status" placeholder="请选择用户状态">
            <el-option label="正常" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>

        <!-- 备注 -->
        <el-form-item :label="$t('posttable.remark')">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="该角色很懒，未写备注信息..."
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 确定 -->
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('posttable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('posttable.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteByPostId, updateRoleByRoleId, fetchPostList, fetchPv, createPostArticle, updatePostArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { checkMaxVal } from '@/utils/validator'
import Searchs from '@/components/Searchs'

// 弹出层dialog拖拽工具
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination, Searchs },
  directives: { waves, elDragDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info',
        2: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      seachType: 'post',
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
      refreshButton: 'el-icon-refresh',
      tableKey: 0,
      list: null,
      visible: false,
      shenheren: true,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
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
        roleName: [{ required: true, message: '请输入角色名称', trigger: ['blur'] }],
        roleKey: [{ required: true, message: '请输入权限字符', trigger: ['blur'] }],
        date: [{ type: 'date', message: '日期格式不对', trigger: ['blur'] }],
        roleSort: [{ validator: checkMaxVal, trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getPostList()
  },
  methods: {
    // 刷新按钮
    async refresh() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery = {
        page: 1,
        limit: 8
      }
      await this.getPostList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取角色列表
    getPostList() {
      this.listLoading = true
      fetchPostList(this.listQuery).then(response => {
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
      // this.getList()
      this.getPostList()
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
        deleteByPostId(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getPostList()
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
      this.temp = {}
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
          createPostArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getPostList()
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
          updatePostArticle(tempData).then(() => {
            this.dialogFormVisible = false
            this.getPostList()
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
