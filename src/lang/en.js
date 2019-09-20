/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-09-20 17:11:54
 */
export default {
  route: {
    dashboard: 'Dashboard',
    system: 'System',
    systemmonitoring: 'System monitoring',
    systemtools: 'System tools',
    systemuser: 'System user',
    systemrole: 'System role',
    systemmenu: 'system menu',
    systemdept: 'system dept',
    systempost: 'system post',
    dictionary: 'dictionary',
    dictdata: 'dictdata',
    config: 'parameter',
    notice: 'notice',
    log: 'log',
    operlog: 'operlog',
    loginlog: 'loginlog',
    onlineusers: 'online users',
    timingtasks: 'timing tasks',
    datamonitoring: 'data monitoring',
    servicemonitoring: 'service monitoring',
    formconstruction: 'form construction',
    codegeneration: 'code generation',
    systeminterface: 'system interface',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Back To Top',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    profile: 'Profile'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login Form',
    logIn: 'Login',
    userName: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !',
    Successful_language_switching: 'Successful language switching'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  usertable: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'Reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    actions: 'Actions',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    userId: 'userId',
    userName: 'Login Account',
    userNick: 'userName',
    email: 'email',
    sex: 'sex',
    dept: 'Dept',
    phonenumber: 'Model',
    status: 'Status',
    createDate: 'CreateDate',
    loginIp: 'loginIp',
    edit: 'Edit',
    discontinuation: 'Discontinuation',
    enabling: 'Enabling',
    remarks: 'Remarks',
    password: 'Password'
  },
  roletable: {
    roleId: 'RoleId',
    roleName: 'RoleName',
    roleKey: 'RoleKey',
    roleSort: 'roleSort',
    displayOrder: 'DisplayOrder',
    roleStatus: 'RoleStatus',
    createTime: 'createTime',
    updateTime: 'updateTime',
    edit: 'Edit',
    dataPermissions: 'DataPermissions',
    actions: 'Actions',
    allocateUsers: 'AllocateUsers',
    delete: 'Delete',
    dataScope: 'Data Scope',
    remark: 'Role Description',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    title: 'Title',
    type: 'Type',
    status: 'Status',
    confirm: 'Confirm',
    cancel: 'Cancel',
    date: 'Date',
    editRole: 'Editor role permissions',
    isDefault: 'Default roles',
    menuPermissions: 'menu permissions',
    remarks: 'Remarks',
    Permissions: 'Jurisdiction',
    deletePrompt: 'Are you sure you want to delete it?'
  },
  menutable: {
    id: 'Id',
    menuId: 'MenuId',
    menuName: 'MenuName',
    parentId: 'ParentId',
    orderNum: 'OrderNum',
    url: 'Url',
    target: 'Target',
    menuType: 'MenuType',
    visible: 'Visible',
    perms: 'Perms',
    icon: 'Icon',
    show: 'Show',
    edit: 'Edit',
    addMenu: 'AddMenu',
    delete: 'Delete',
    createBy: 'CreateBy',
    createTime: 'CreateTime',
    updateBy: 'UpdateBy',
    updateTime: 'UpdateTime',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    confirm: 'Confirm',
    cancel: 'Cancel',
    editMenu: 'editMenu',
    i18: 'MenuCoding'
  },
  depttable: {
    id: 'id',
    deptId: 'deptId',
    parentId: 'parentId',
    ancestors: 'ancestors',
    deptName: 'deptName',
    orderNum: 'orderNum',
    leader: 'leader',
    phone: 'phone',
    email: 'email',
    status: 'status',
    delFlag: 'delFlag',
    createBy: 'createBy',
    createTime: 'createTime',
    updateBy: 'updateBy',
    updateTime: 'updateTime',
    edit: 'edit',
    addDept: 'add',
    delete: 'delete',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    confirm: 'Confirm',
    cancel: 'Cancel',
    editMenu: 'editMenu'
  },
  posttable: {
    id: 'id',
    postId: 'postId',
    postCode: 'postCode',
    postName: 'postName',
    Order: 'Order',
    status: 'status',
    createDate: 'createDate',
    edit: 'edit',
    delete: 'delete',
    postSort: 'postSort',
    remark: 'remark',
    createBy: 'createBy',
    createTime: 'createTime',
    updateBy: 'updateBy',
    updateTime: 'updateTime',
    actions: 'edit',
    addDept: 'add',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    confirm: 'Confirm',
    cancel: 'Cancel',
    editMenu: 'editMenu'
  },
  dictionarytable: {
    id: 'id',
    dictId: 'dictId',
    dictName: 'dictName',
    dictType: 'dictType',
    status: 'status',
    remark: 'remarks',
    createDate: 'createDate',
    createBy: 'createBy',
    createTime: 'createTime',
    updateBy: 'updateBy',
    updateTime: 'updateTime',
    edit: 'edit',
    list: 'list',
    delete: 'delete',
    actions: 'actions',
    export: 'export',
    add: 'add',
    confirm: 'confirm',
    cancel: 'cancel',
    search: 'search',
    editMenu: 'editMenu',
    startDate: 'startDate',
    endDate: 'endDate'
  },
  dictdatatable: {
    id: 'id',
    dictCode: 'dictCode',
    dictSort: 'dictSort',
    dictLabel: 'dictLabel',
    dictValue: 'dictValue',
    dictType: 'dictType',
    cssClass: 'cssClass',
    listClass: 'listClass',
    isDefault: 'isDefault',
    status: 'status',
    remark: 'remark',
    createDate: 'createDate',
    createBy: 'createBy',
    createTime: 'createTime',
    updateBy: 'updateBy',
    updateTime: 'updateTime',
    edit: 'edit',
    list: 'list',
    delete: 'delete',
    actions: 'actions',
    export: 'export',
    add: 'add',
    confirm: 'confirm',
    cancel: 'cancel',
    search: 'search',
    editMenu: 'editMenu'
  },
  configtable: {
    id: 'id',
    configId: 'configId',
    configName: 'configName',
    configKey: 'configKey',
    configValue: 'configValue',
    configType: 'configType',
    status: 'status',
    remark: 'remark',
    createDate: 'createDate',
    createBy: 'createBy',
    createTime: 'createTime',
    updateBy: 'updateBy',
    updateTime: 'updateTime',
    edit: 'edit',
    list: 'list',
    delete: 'delete',
    actions: 'actions',
    export: 'export',
    add: 'add',
    confirm: 'confirm',
    cancel: 'cancel',
    search: 'search',
    editMenu: 'editMenu'
  },
  noticetable: {
    id: 'id',
    noticeId: 'noticeId',
    noticeTitle: 'noticeTitle',
    noticeType: 'noticeType',
    noticeContent: 'noticeContent',
    status: 'status',
    remark: 'remark',
    createDate: 'createDate',
    createBy: 'createBy',
    createTime: 'createTime',
    updateBy: 'updateBy',
    updateTime: 'updateTime',
    edit: 'edit',
    list: 'list',
    delete: 'delete',
    actions: 'actions',
    export: 'export',
    add: 'add',
    confirm: 'confirm',
    cancel: 'cancel',
    search: 'search',
    editMenu: 'editMenu'
  },
  operlogtable: {
    id: 'id',
    operId: 'operId',
    title: 'title',
    businessType: 'businessType',
    method: 'method',
    operatorType: 'operatorType',
    operName: 'operName',
    deptName: 'deptName',
    operUrl: 'operUrl',
    operIp: 'operIp',
    operLocation: 'operLocation',
    operParam: 'operParam',
    errorMsg: 'errorMsg',
    operTime: 'operTime',
    status: 'status',
    remark: 'remark',
    createDate: 'createDate',
    createBy: 'createBy',
    createTime: 'createTime',
    updateBy: 'updateBy',
    updateTime: 'updateTime',
    edit: 'edit',
    list: 'list',
    delete: 'delete',
    actions: 'actions',
    export: 'export',
    add: 'add',
    confirm: 'confirm',
    cancel: 'cancel',
    search: 'search',
    editMenu: 'editMenu',
    empty: 'empty',
    startDate: 'startDate',
    endDate: 'endDate',
    detailed: 'detailed'
  },
  loginlogtable: {
    id: 'id',
    infoId: 'Access Number',
    loginName: 'Login account',
    ipaddr: 'Login IP Address',
    loginLocation: 'Location of login',
    browser: 'Browser type',
    os: 'operating system',
    msg: 'Tip message',
    loginTime: 'Access time',
    status: 'status',
    remark: 'remark',
    createDate: 'createDate',
    createBy: 'createBy',
    createTime: 'createTime',
    updateBy: 'updateBy',
    updateTime: 'updateTime',
    edit: 'edit',
    list: 'list',
    delete: 'delete',
    actions: 'actions',
    export: 'export',
    add: 'add',
    confirm: 'confirm',
    cancel: 'cancel',
    search: 'search',
    editMenu: 'editMenu',
    startDate: 'startDate',
    endDate: 'endDate',
    empty: 'empty'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  currency: {
    search: 'search',
    add: 'add',
    export: 'export',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate'
  }
}
