<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:52
 * @LastEditors: anan
 * @LastEditTime: 2019-09-21 16:46:02
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
          <vxe-table
            :data="list"
            stripe
            border
            align="center"
            highlight-current-row
            highlight-hover-row
            show-overflow="true,tooltip"
            :tree-config="{children: 'children', expandAll: false}"
          >
            <!-- 菜单名称 -->
            <vxe-table-column
              field="menuName"
              :title="$t('menutable.menuName')"
              tree-node
              align="left"
              header-align="center"
              width="150"
            />
            <!-- 显示顺序 -->
            <vxe-table-column field="orderNum" :title="$t('menutable.orderNum')" />
            <!-- 请求地址 -->
            <vxe-table-column field="url" width="150" :title="$t('menutable.url')" />
            <!-- 菜单类型 -->
            <vxe-table-column field="menuType" :title="$t('menutable.menuType')">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.menuType | menuTypeFilter"
                >{{ typeAuthority[scope.row.menuType] }}</el-tag>
              </template>
            </vxe-table-column>
            <!-- 菜单状态 -->
            <vxe-table-column field="visible" :title="$t('menutable.visible')">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.visible | visibleFilter"
                >{{ visibleAuthority[scope.row.visible] }}</el-tag>
              </template>
              >
            </vxe-table-column>
            <!-- 权限标识 -->
            <vxe-table-column field="perms" width="150" :title="$t('menutable.perms')" />
            <!-- 操作 -->
            <vxe-table-column title="操作" width="190">
              <template v-slot="{ row }">
                <template>
                  <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      circle
                      @click="handleUpdate(row)"
                    />
                  </el-tooltip>
                  <!-- 新增 -->
                  <el-tooltip class="item" effect="dark" content="新增下级" placement="top">
                    <el-button
                      circle
                      type="warning"
                      icon="el-icon-star-off"
                      @click="handleCreateMenu(row,'insert')"
                    />
                  </el-tooltip>

                  <!-- 删除 -->
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
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
                  </el-tooltip>
                </template>
              </template>
            </vxe-table-column>
          </vxe-table>
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
          <el-input
            v-if="disabled"
            v-model="temp.parentName"
            placeholder="默认为顶级菜单"
            @focus="menuPvVisible=true"
          />
          <el-input v-else v-model="temp.parentName" disabled @focus="menuPvVisible=true" />
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

        <!-- 菜单编码 -->
        <el-form-item v-if="temp.menuType!=='F'" :label="$t('menutable.i18')" prop="i18">
          <el-input v-model="temp.i18" />
        </el-form-item>

        <!-- 请求地址 -->
        <el-form-item v-show="temp.menuType==='C'" :label="$t('menutable.url')" prop="url">
          <el-input v-if="url==='#/' || url===''" v-model="temp.url" />
          <el-input v-else v-model="temp.url" placeholder="请输入内容">
            <template slot="prepend">{{ url }}</template>
          </el-input>
        </el-form-item>

        <!-- 打开方式target（menuItem页签 menuBlank新窗口）targetAuthority -->
        <el-form-item v-show="temp.menuType==='C'" :label="$t('menutable.target')" prop="target">
          <el-select v-model="temp.region" placeholder="该选项暂时无用">
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
          prop="perms"
        >
          <el-radio-group v-model="temp.perms">
            <el-radio
              v-for="type in permsType"
              :key="type.key"
              :disabled="temp.menuType===type.disabled"
              :label="type.key"
            >{{ type.value }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 显示排序 -->
        <el-form-item :label="$t('menutable.orderNum')" prop="roleSort">
          <el-input v-model.number="temp.orderNum" />
        </el-form-item>

        <!-- 图标 -->
        <el-form-item
          v-show="temp.menuType==='M' ||temp.menuType==='C'"
          :label="$t('menutable.icon')"
          prop="roleSort"
        >
          <el-input
            v-if="!temp.icon"
            v-model="temp.icon"
            placeholder="请为目录、菜单选择一个图标!!!"
            @focus="menuPvIcon=true"
          />
          <div v-else>
            <svg-icon :icon-class="temp.icon" class-name="icon-size" @focus="menuPvIcon=true" />
            <span>点图标进行修改</span>
          </div>
        </el-form-item>

        <!-- 菜单状态 -->
        <el-form-item :label="$t('menutable.visible')" prop="roleSort">
          <!-- <el-input v-model="temp.visible" /> -->
          <el-switch
            v-model="temp.visible"
            active-text="隐藏"
            inactive-text="显示"
            active-color="#909399"
            inactive-color="#13ce66"
            active-value="1"
            inactive-value="0"
          />
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

    <!-- 弹出部门树 -->
    <el-dialog :visible.sync="menuPvVisible" title="菜单">
      <cliren-left-tree @updateTreeMenuId="updateTreeMenuId" />
    </el-dialog>

    <!-- 弹出icon选择器 -->
    <el-dialog :visible.sync="menuPvIcon" width="80%" style="padding:0;">
      <admin-icon :visible.sync="menuPvIcon" @updateIcon="updateIcon" />
    </el-dialog>
  </div>
</template>

<script>
import { delMenuById, fetchMenuList, fetchPv, createMenu, updateMenuById } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { checkMaxVal } from '@/utils/validator'
import clirenLeftTree from './cliren-left-tree'
import adminIcon from './admin-icon'
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
  components: { Searchs, clirenLeftTree, adminIcon }, // Pagination
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
    },
    permsFilter(perms) {
      console.log(perms)
      return perms
    }
  },
  data() {
    return {
      permsType: [
        { key: 'view', value: '查询', disabled: 'F' },
        { key: 'list', value: '查询', disabled: 'C' },
        { key: 'add', value: '新增', disabled: 'C' },
        { key: 'edit', value: '修改', disabled: 'C' },
        { key: 'remove', value: '删除', disabled: 'C' },
        { key: 'export', value: '导出', disabled: 'C' },
        { key: 'import', value: '导入', disabled: 'C' },
        { key: 'resetPwd', value: '重置密码', disabled: 'C' },
        { key: 'detail', value: '详细信息', disabled: 'C' },
        { key: 'batchForceLogout', value: '批量强退', disabled: 'C' },
        { key: 'forceLogout', value: '单条强退', disabled: 'C' },
        { key: 'changestatus', value: '状态修改', disabled: 'C' },
        { key: 'code', value: '代码生成', disabled: 'C' }
      ],
      perms: '',
      url: '',
      menuPvVisible: false,
      menuPvIcon: false,
      dialogPvVisible: false,
      seachType: 'menu',
      closeOnClickModal: false,
      typeAuthority: {
        'M': '目录',
        'C': '菜单',
        'F': '按钮'
      },
      disabled: true,
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
      rules: {
        menuName: [{ required: true, message: '请输入角色名称', trigger: ['blur'] }],
        i18: [{ required: true, message: '请输入角色编码', trigger: ['blur'] }],
        menuType: [{ required: true, message: '请选择菜单类型', trigger: ['blur'] }],
        perms: [{ required: true, message: '权限不得为空', trigger: ['blur'] }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    updateTreeMenuId(data) {
      this.temp.parentId = data.menuId
      this.temp.parentName = data.menuName
      this.menuPvVisible = false
    },
    updateIcon(data) {
      this.menuPvIcon = false
      this.temp.icon = data
      console.log(data)
    },
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
        delMenuById(row.menuId).then(response => {
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
      this.temp = {}
    },
    // 新增按钮
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.disabled = true
      this.dialogFormVisible = true
      this.url = ''
      this.perms = ''
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    // 新增下级按钮
    handleCreateMenu(row, status) {
      console.log(this.temp)
      if (status === 'insert') {
        this.resetTemp()
        this.disabled = false
        this.temp.parentId = row.menuId
        this.temp.parentName = row.menuName
        this.url = row.url + '/'
        this.perms = row.perms.substring(0, row.perms.lastIndexOf(':') + 1)
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        debugger
        if (valid) {
          this.temp.dataScope = '1'
          this.temp.status = '0'
          this.temp.createTime = new Date()
          this.temp.updateTime = new Date()
          delete this.temp.children
          var str = ''
          switch (this.temp.menuType) {
            case 'M':
              this.temp.url = '#'
              break
            case 'C':
              str = this.filterUrl(this.temp.url)
              this.temp.perms = str + 'view'
              break
            case 'F':
              this.temp.url = '#'
              delete this.temp.i18
              str = this.filterUrl(this.temp.url)
              this.temp.perms = str + this.temp.perms
              break
            default:
              break
          }

          createMenu(this.temp).then(() => {
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
    filterUrl(data) {
      console.log(data)
      var fh = ''
      const str = data.indexOf('/') === 0 ? data.substring(1) : data
      var array = str.split('/')
      array.forEach(arr => {
        fh = fh + arr + ':'
      })
      return fh
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.url = ''
      this.dialogFormVisible = true
      if (this.temp.menuType !== 'M' && this.temp.perms.indexOf(':') > 0) {
        this.temp.perms = this.temp.perms.substring(this.temp.perms.lastIndexOf(':') + 1)
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.updateTime = new Date()
          if (tempData.menuType === 'F') {
            delete tempData.i18
          }
          if (tempData.menuType === 'C') {
            var str = this.filterUrl(this.temp.url)
            tempData.perms = str + 'view'
          }
          updateMenuById(tempData).then(() => {
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
.icon-size {
  font-size: 1.625rem;
  font-weight: 500;
}
</style>

