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
            row-key="menuId"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange"
          >
            <!-- 序号 -->
            <!-- <el-table-column type="index" width="40" align="center" /> -->

            <!-- 角色名称 -->
            <el-table-column :label="$t('menutable.menuName')" align="left" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.menuName }}</span>
              </template>
            </el-table-column>

            <!-- 显示顺序 -->
            <el-table-column :label="$t('menutable.orderNum')" align="center" width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.orderNum }}</span>
              </template>
            </el-table-column>

            <!-- 请求地址 -->
            <el-table-column :label="$t('menutable.url')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.url }}</span>
              </template>
            </el-table-column>

            <!-- 菜单类型 -->
            <el-table-column :label="$t('menutable.menuType')" align="center" width="80">
              <template slot-scope="scope">
                <el-tag
                  effect="dark"
                  :type="scope.row.menuType | menuTypeFilter"
                >{{ typeAuthority[scope.row.menuType] }}</el-tag>
              </template>
            </el-table-column>

            <!-- 菜单状态 -->
            <el-table-column :label="$t('menutable.visible')" align="center" width="80">
              <template slot-scope="scope">
                <el-tag
                  effect="Plain"
                  :type="scope.row.visible | visibleFilter"
                >{{ visibleAuthority[scope.row.visible] }}</el-tag>
              </template>
            </el-table-column>

            <!-- 权限标识 -->
            <el-table-column :label="$t('menutable.perms')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.perms }}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column :label="$t('menutable.perms')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.perms | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
            </el-table-column>-->

            <!-- 操作 -->
            <el-table-column
              :label="$t('menutable.edit')"
              align="center"
              width="190"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{row}">
                <!-- 操作/编辑 -->
                <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(row)" />

                <!-- 新增 -->
                <el-button
                  circle
                  type="warning"
                  icon="el-icon-star-off"
                  @click="handleCreateMenu(row,'insert')"
                />

                <!-- 删除 -->
                <el-popover
                  v-model="row.show"
                  placement="top"
                  width="160"
                  style="margin-left:10px;"
                >
                  <p>你确定要删除该用户吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="row.show = false">取消</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="handleModifyStatus(row,'deleted')"
                    >确定</el-button>
                  </div>
                  <el-button slot="reference" circle type="danger" icon="el-icon-delete" />
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
            @pagination="getMenuList"
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
        <!-- 上级菜单 -->
        <el-form-item :label="$t('menutable.parentId')">
          <!-- <el-input v-model="temp.parentId " /> -->
          <el-input v-model="temp.parentId" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-form-item>

        <!-- 菜单类型 -->
        <el-form-item :label="$t('menutable.menuType')" prop="menuType">
          <el-radio-group v-model="temp.menuType" @change="selectRadio(temp)">
            <el-radio
              v-for="type in menuTypeAuthority"
              :key="type.key"
              :label="type.key"
            >{{ type.value }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 菜单名称 -->
        <el-form-item :label="$t('menutable.menuName')" prop="menuName">
          <el-input v-model="temp.menuName" />
        </el-form-item>

        <!-- 请求地址 -->
        <el-form-item v-show="temp.menuType==='C'" :label="$t('menutable.url')" prop="url">
          <el-input v-model="temp.url" />
        </el-form-item>

        <!-- 打开方式target（menuItem页签 menuBlank新窗口）targetAuthority -->
        <el-form-item v-show="temp.menuType==='C'" :label="$t('menutable.target')" prop="target">
          <el-select v-model="temp.region" placeholder="请选择打开方式">
            <el-option
              v-for="region in targetAuthority"
              :key="region.key"
              :label="region"
              :value="region"
            />
          </el-select>
        </el-form-item>

        <!-- 权限标识 -->
        <el-form-item
          v-show="temp.menuType==='C' || temp.menuType==='F' "
          :label="$t('menutable.perms')"
          prop="roleSort"
        >
          <el-input v-model="temp.perms" />
        </el-form-item>

        <!-- 显示排序 -->
        <el-form-item :label="$t('menutable.orderNum')" prop="roleSort">
          <el-input v-model.number="temp.orderNum" />
        </el-form-item>

        <!-- 图标 -->
        <el-form-item v-show="temp.menuType==='M'" :label="$t('menutable.icon')" prop="roleSort">
          <el-input v-model="temp.icon" />
        </el-form-item>

        <!-- 菜单状态 -->
        <el-form-item :label="$t('menutable.visible')" prop="roleSort">
          <!-- <el-input v-model="temp.visible" /> -->
          <el-switch v-model="temp.visible" active-text="显示" inactive-text="隐藏" />
        </el-form-item>

        <!-- 创建者 -->
        <el-form-item v-show="1===2" :label="$t('menutable.createBy')" prop="roleSort">
          <el-input v-model="temp.createBy" />
        </el-form-item>

        <!-- 创建时间 -->
        <el-form-item v-show="1===2" :label="$t('menutable.createTime')" prop="roleSort">
          <el-input v-model="temp.createTime" />
        </el-form-item>

        <!-- 角色说明 -->
        <el-form-item v-show="1===2" :label="$t('menutable.remark')">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="菜单备注信息..."
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 确定 -->
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('menutable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('menutable.cancel') }}</el-button>
      </div>
    </el-dialog>

    <!-- 权限分配窗口 -->
    <!-- <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogPvVisible"
      :title="$t('menutable.editMenu')"
      center
      width="80%"
      append-to-body
      custom-class="dialog-dietRole"
      :close-on-click-modal="closeOnClickModal"
    >
      <role-to-permission :temp="temp" />
    </el-dialog>-->
  </div>
</template>

<script>
import { deleteByRoleId, fetchMenuList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { checkMaxVal } from '@/utils/validator'
import Searchs from '@/components/Searchs'

// updateRoleByRoleId ,

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
    menuTypeFilter(status) {
      const typeMap = {
        'M': '',
        'C': 'success',
        'F': 'info'
      }
      return typeMap[status]
    },
    visibleFilter(status) {
      const visibleMap = {
        '0': '',
        '1': 'danger'
      }
      return visibleMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      seachType: 'menu',
      closeOnClickModal: false,
      typeAuthority: {
        'M': '目录',
        'C': '菜单',
        'F': '按钮'
      },
      visibleAuthority: {
        '0': '显示',
        '1': '隐藏'
      },
      targetAuthority: {
        'menuItem': '页签',
        'menuBlank': '新窗口'
      },
      menuTypeAuthority: [
        { key: 'M', value: '目录' },
        { key: 'C', value: '菜单' },
        { key: 'F', value: '按钮' }
      ],
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
        sort: '+id',
        parentId: 0
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dialogPvVisible: false,
      rules: {
        menuName: [{ required: true, message: '请输入角色名称', trigger: ['blur'] }],
        menuType: [{ required: true, message: '请选择菜单类型', trigger: ['blur'] }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    selectRadio(value) {
      console.log(value.menuType)
    },
    // 刷新按钮
    async refresh() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery = {
        page: 1,
        limit: 8,
        parentId: 0
      }
      await this.getMenuList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取角色列表
    getMenuList() {
      this.listLoading = true
      fetchMenuList(this.listQuery).then(response => {
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
      this.getMenuList()
    },
    handleModifyStatus(row, status) {
      if (status === 'insert') {
        // 新增
        console.log(row)
      } else if (status === 'deleted') {
        // 删除
        row.show = false
        deleteByRoleId(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getMenuList()
          }, 3 * 1000)
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
        menuId: '',
        menuName: '',
        menuType: '',
        parentId: '',
        orderNum: '',
        url: '',
        target: '',
        show: '',
        perms: '',
        icon: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleCreateMenu(row, status) {
      if (status === 'insert') {
        this.resetTemp()
        this.temp.parentId = row.menuId
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        console.log(this.temp)
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.dataScope = '1'
          this.temp.status = '0'
          this.temp.createTime = new Date()
          this.temp.updateTime = new Date()
          createArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getMenuList()
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
          updateArticle(tempData).then(() => {
            this.dialogFormVisible = false
            this.getMenuList()
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
        const tHeader = ['角色名', '权限字符', '显示顺序', '状态', '创建时间', '修改时间', '数据范围', '备注']
        const filterVal = ['roleName', 'roleKey', 'roleSort', 'status', 'createTime', 'updateTime', 'dataScope', 'remark']
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
</style>
