export default {
  route: {
    dashboard: '首页',
    system: '系统管理',
    systemuser: '用户管理',
    systemrole: '角色管理',
    systemmenu: '菜单管理',
    systemdept: '部门管理',
    systempost: '岗位管理',
    dictionary: '字典管理',
    dictdata: '字典数据',
    config: '参数管理',
    notice: '通知公告',
    log: '日志管理',
    operlog: '操作日志',
    loginlog: '登陆日志',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON 编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单 1-1',
    'menu1-2': '菜单 1-2',
    'menu1-2-1': '菜单 1-2-1',
    'menu1-2-2': '菜单 1-2-2',
    'menu1-3': '菜单 1-3',
    menu2: '菜单 2',
    Table: 'Table',
    dynamicTable: '动态 Table',
    dragTable: '拖拽 Table',
    inlineEditTable: 'Table 内编辑',
    complexTable: '综合 Table',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: '导出 Excel',
    selectExcel: '导出 已选择项',
    mergeHeader: '导出 多级表头',
    uploadExcel: '上传 Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链',
    profile: '个人中心'
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    userName: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！',
    Successful_language_switching: '切换语言成功'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  usertable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    loginDate: '时间',
    author: '作者',
    readings: '阅读数',
    actions: '操作',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    userId: '用户ID',
    sex: '性别',
    userName: '登陆帐号',
    userNick: '用户昵称',
    email: '邮箱',
    dept: '部门',
    phonenumber: '手机',
    status: '用户状态',
    createDate: '创建时间',
    loginIp: '最后登录IP',
    edit: '操作',
    discontinuation: '停用',
    enabling: '启用',
    remarks: '备注',
    password: '密码'
  },
  roletable: {
    id: '序号',
    roleId: '角色编号',
    roleName: '角色名称',
    roleKey: '权限字符',
    roleSort: '显示顺序',
    displayOrder: '显示顺序',
    roleStatus: '角色状态',
    createTime: '创建时间',
    updateTime: '修改时间',
    edit: '操作',
    dataPermissions: '数据权限',
    actions: '操作',
    allocateUsers: '分配用户',
    delete: '删除',
    dataScope: '数据范围',
    remark: '角色描述',
    search: '搜索',
    add: '添加',
    export: '导出',
    title: '标题',
    type: '类型',
    status: '用户状态',
    confirm: '确 定',
    cancel: '取 消',
    date: '时间',
    editRole: '编辑角色权限'
  },
  menutable: {
    id: '序号',
    menuId: '菜单ID',
    menuName: '菜单名称',
    parentId: '上级菜单',
    orderNum: '显示顺序',
    url: '请求地址',
    target: '打开方式',
    menuType: '菜单类型',
    visible: '菜单状态',
    perms: '权限标识',
    icon: '菜单图标',
    show: '可见',
    edit: '操作',
    addMenu: '新增',
    delete: '删除',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    remark: '备注',
    search: '搜索',
    add: '添加',
    export: '导出',
    confirm: '确 定',
    cancel: '取 消',
    editMenu: '编辑菜单'
  },
  depttable: {
    id: '序号',
    deptId: '部门ID',
    parentId: '父级部门',
    ancestors: '祖级列表',
    deptName: '部门名称',
    orderNum: '显示顺序',
    leader: '负责人',
    phone: '联系电话',
    email: '邮箱',
    status: '部门状态',
    delFlag: '删除标志',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    edit: '操作',
    addDept: '新增',
    delete: '删除',
    search: '搜索',
    add: '添加',
    export: '导出',
    confirm: '确 定',
    cancel: '取 消',
    editMenu: '编辑菜单'
  },
  posttable: {
    id: '序号',
    postId: '岗位编号',
    postCode: '岗位编码',
    postName: '岗位名称',
    Order: '显示顺序',
    status: '状态',
    createDate: '创建时间',
    edit: '操作',
    delete: '删除',
    postSort: '显示顺序',
    remark: '备注',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    actions: '操作',
    export: '导出',
    add: '添加',
    confirm: '确 定',
    cancel: '取 消',
    search: '搜索',
    editMenu: '编辑菜单'
  },
  dicttypetable: {
    id: '序号',
    dictId: '字典主键',
    dictName: '字典名称',
    dictType: '字典类型',
    status: '状态',
    remark: '备注',
    createDate: '创建时间',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    edit: '操作',
    list: '列表',
    delete: '删除',
    actions: '操作',
    export: '导出',
    add: '添加',
    confirm: '确 定',
    cancel: '取 消',
    search: '搜索',
    editMenu: '编辑菜单',
    startDate: '开始日期',
    endDate: '结束日期'
  },
  dictdatatable: {
    id: '序号',
    dictCode: '字典编码',
    dictSort: '字典排序',
    dictLabel: '字典标签',
    dictValue: '字典键值',
    dictType: '字典类型',
    cssClass: '样式属性（其他样式扩展）',
    listClass: '表格回显样式',
    isDefault: '是否默认（Y是 N否）',

    status: '状态',
    remark: '备注',
    createDate: '创建时间',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    edit: '操作',
    list: '列表',
    delete: '删除',
    actions: '操作',
    export: '导出',
    add: '添加',
    confirm: '确 定',
    cancel: '取 消',
    search: '搜索',
    editMenu: '编辑菜单'
  },
  configtable: {
    id: '序号',
    configId: '参数主键',
    configName: '参数名称',
    configKey: '参数键名',
    configValue: '参数键值',
    configType: '系统内置',
    remarks: '备注',
    status: '状态',
    remark: '备注',
    createDate: '创建时间',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    edit: '操作',
    list: '列表',
    delete: '删除',
    actions: '操作',
    export: '导出',
    add: '添加',
    confirm: '确 定',
    cancel: '取 消',
    search: '搜索',
    editMenu: '编辑菜单'
  },
  noticetable: {
    id: '序号',
    noticeId: '公告ID',
    noticeTitle: '公告标题',
    noticeType: '公告类型',
    noticeContent: '公告内容',
    remarks: '备注',
    status: '状态',
    remark: '备注',
    createDate: '创建时间',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    edit: '操作',
    list: '列表',
    delete: '删除',
    actions: '操作',
    export: '导出',
    add: '添加',
    confirm: '确 定',
    cancel: '取 消',
    search: '搜索',
    editMenu: '编辑菜单'
  },
  operlogtable: {
    id: '序号',
    operId: '日志编号',
    title: '系统模块',
    businessType: '业务类型',
    method: '方法名称',
    operatorType: '操作类型',
    operName: '操作人员',
    deptName: '部门名称',
    operUrl: '请求URL',
    operIp: '主机地址',
    operLocation: '操作地点',
    operParam: '请求参数',
    errorMsg: '错误消息',
    operTime: '操作时间',
    status: '状态',
    remark: '备注',
    createDate: '创建时间',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    edit: '操作',
    list: '列表',
    delete: '删除',
    actions: '操作',
    export: '导出',
    add: '添加',
    confirm: '确 定',
    cancel: '取 消',
    search: '搜索',
    editMenu: '编辑菜单',
    empty: '清空',
    endDate: '结束时间',
    startDate: '开始时间',
    detailed: '详细'
  },
  // 登陆日志
  loginlogtable: {
    id: '序号',
    infoId: '访问编号',
    loginName: '登录账号',
    ipaddr: '登录IP地址',
    loginLocation: '登录地点',
    browser: '浏览器类型',
    os: '操作系统',
    status: '登录状态',
    msg: '提示消息',
    loginTime: '访问时间',
    remark: '备注',
    createDate: '创建时间',
    createBy: '创建者',
    createTime: '创建时间',
    updateBy: '更新者',
    updateTime: '更新时间',
    edit: '操作',
    list: '列表',
    delete: '删除',
    actions: '操作',
    export: '导出',
    add: '添加',
    confirm: '确 定',
    cancel: '取 消',
    search: '搜索',
    editMenu: '编辑菜单',
    startDate: '开始时间',
    endDate: '结束时间',
    empty: '清空'
  },
  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  currency: {
    search: '搜索',
    add: '添加',
    export: '导出'
  }
}
