<template>
  <div>
    <el-row>
      <span class="dialog-span">
        <span>编辑角色的权限：</span>
        <span>该功能还未开发完成</span>
        <el-tag>{{ temp.roleName }}</el-tag>
      </span>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="role-permission-card">
            <el-tag>菜单</el-tag>
            <span>权限元数据</span>
          </div>
          <div class="role-permission-div">提示：勾选权限即可为角色授权</div>
          <left-tree />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="role-permission-card">
            <el-tag>菜单</el-tag>
            <span>权限元数据</span>
          </div>
          <div class="role-permission-div">提示：勾选权限即可为角色授权</div>
          <left-tree />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="role-permission-card">
            <el-tag>菜单</el-tag>
            <span>权限元数据</span>
          </div>
          <div class="role-permission-div">提示：勾选权限即可为角色授权</div>
          <left-tree />
        </el-card>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer">
      <!-- 确定 -->
      <el-button type="primary" @click="dialogPvVisible = false">{{ $t('roletable.confirm') }}</el-button>
      <!-- 取消 -->
      <el-button @click="dialogPvVisible = false">{{ $t('roletable.cancel') }}</el-button>
    </div>
  </div>
</template>

<script>
import leftTree from './left-tree'

export default {
  components: {
    leftTree
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    temp: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
.dialog-span {
  display: inline-block;
  margin: 20px 10px;
}
.role-permission-card {
  margin: 0.625rem;
  font-size: 1.25rem;
  color: black;
}
.role-permission-div {
  margin: 0.625rem;
  color: #909399;
}
</style>
