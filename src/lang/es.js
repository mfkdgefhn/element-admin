export default {
  route: {
    dashboard: 'Panel de control',
    system: 'Sistema',
    systemuser: 'Systemuser',
    systemrole: 'Gestión de funciones',
    systemmenu: 'Systemenu',
    systemdept: 'Gestión sectorial',
    systempost: 'Gestión de puestos',
    dictionary: 'Diccionario',
    dictdata: 'Datos Auditivos',
    config: 'Gestión de parámetros',
    notice: 'Anuncios',
    log: 'Log',
    operlog: 'Registro de Operaciones',
    loginlog: 'Registro de entrada',
    documentation: 'Documentación',
    guide: 'Guía',
    permission: 'Permisos',
    rolePermission: 'Permisos de rol',
    pagePermission: 'Permisos de la página',
    directivePermission: 'Permisos de la directiva',
    icons: 'Iconos',
    components: 'Componentes',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'Editor JSON',
    dndList: 'Lista Dnd',
    splitPane: 'Panel dividido',
    avatarUpload: 'Subir avatar',
    dropzone: 'Subir ficheros',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'Ir arriba',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Gráficos',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Gráfico de líneas',
    mixChart: 'Mix Chart',
    example: 'Ejemplo',
    nested: 'Rutas anidadass',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Tabla',
    dynamicTable: 'Tabla dinámica',
    dragTable: 'Arrastrar tabla',
    inlineEditTable: 'Editor',
    complexTable: 'Complex Table',
    tab: 'Pestaña',
    form: 'Formulario',
    createArticle: 'Crear artículo',
    editArticle: 'Editar artículo',
    articleList: 'Listado de artículos',
    errorPages: 'Páginas de error',
    page401: '401',
    page404: '404',
    errorLog: 'Registro de errores',
    excel: 'Excel',
    exportExcel: 'Exportar a Excel',
    selectExcel: 'Export seleccionado',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Subir Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Exportar a Zip',
    theme: 'Tema',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'Enlace externo',
    profile: 'Profile'
  },
  navbar: {
    logOut: 'Salir',
    dashboard: 'Panel de control',
    github: 'Github',
    theme: 'Tema',
    size: 'Tamaño global',
    profile: 'Profile'
  },
  login: {
    title: 'Formulario de acceso',
    logIn: 'Acceso',
    userName: 'Usuario',
    password: 'Contraseña',
    any: 'nada',
    thirdparty: 'Conectar con',
    thirdpartyTips: 'No se puede simular en local, así que combine su propia simulación de negocios. ! !',
    Successful_language_switching: 'Cambio de idioma'
  },
  documentation: {
    documentation: 'Documentación',
    github: 'Repositorio Github'
  },
  permission: {
    addRole: 'Nuevo rol',
    editPermission: 'Permiso de edición',
    roles: 'Tus permisos',
    switchRoles: 'Cambiar permisos',
    tips: 'In some cases it is not suitable to use v-permission, such as element Tab component or el-table-column and other asynchronous rendering dom cases which can only be achieved by manually setting the v-if.',
    delete: 'Borrar',
    confirm: 'Confirmar',
    cancel: 'Cancelar'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Ver guía'
  },
  components: {
    documentation: 'Documentación',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'Orden por defecto',
    dragTips2: 'The after dragging order',
    title: 'Título',
    importance: 'Importancia',
    type: 'Tipo',
    remark: 'Remark',
    search: 'Buscar',
    add: 'Añadir',
    export: 'Exportar',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Fecha',
    author: 'Autor',
    readings: 'Lector',
    status: 'Estado',
    actions: 'Acciones',
    edit: 'Editar',
    publish: 'Publicar',
    draft: 'Draft',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    confirm: 'Confirmar'
  },
  usertable: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'Orden por defecto',
    dragTips2: 'The after dragging order',
    title: 'Título',
    importance: 'Importancia',
    type: 'Tipo',
    remark: 'Remark',
    search: 'Buscar',
    add: 'Añadir',
    export: 'Exportar',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Fecha',
    author: 'Autor',
    readings: 'Lector',
    actions: 'Acciones',
    publish: 'Publicar',
    draft: 'Draft',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    userId: 'usuario',
    sex: 'Género',
    userName: 'Número de cuenta',
    userNick: 'Nombre del usuario',
    email: 'Correo',
    dept: 'Sector',
    phonenumber: 'Teléfono',
    status: 'Estado',
    createDate: 'Tiempo de creación',
    loginIp: 'Último acceso',
    edit: 'Editar',
    discontinuation: 'Desactivación',
    enabling: 'Activar',
    remarks: 'Observaciones',
    password: 'Contraseña'
  },
  roletable: {
    roleId: 'Número de papel',
    roleName: 'Nombre del personaje',
    roleKey: 'Carácter de autorización',
    role_sort: 'Orden de visualización',
    displayOrder: 'Orden de visualización',
    roleStatus: 'Estado del personaje',
    createTime: 'Tiempo de creación',
    updateTime: 'Tiempo de modificación',
    edit: 'Operación',
    dataPermissions: 'Acceso de datos',
    actions: 'Operación',
    allocateUsers: 'Asignar usuario',
    delete: 'Eliminar',
    dataScope: 'Ámbito de datos',
    remark: 'Descripción del papel',
    search: 'Búsqueda',
    add: 'Adición',
    export: 'Exportación',
    title: 'Título',
    type: 'Tipo',
    status: 'Estado',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    date: 'Fecha',
    editRole: 'Editar permisos'
  },
  menutable: {
    id: 'Número',
    menuId: 'ID del menú',
    menuName: 'Nombre del menú',
    parentId: 'Menúpadre',
    orderNum: 'Orden de visualización',
    url: 'Dirección de solicitud',
    target: 'Modo de apertura',
    menuType: 'Tipo de menú',
    visible: 'Estado del menú',
    perms: 'Identificador de permisos',
    icon: 'Icono de menú',
    show: 'Visible',
    edit: 'Operación',
    addMenu: 'Adición',
    delete: 'Eliminar',
    createBy: 'Creador',
    createTime: 'Tiempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    remark: 'Observaciones',
    search: 'Búsqueda',
    add: 'Adición',
    export: 'Exportación',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    editMenu: 'Editar menú'
  },
  depttable: {
    id: 'Número',
    deptId: 'ID del Departamento',
    parentId: 'Categoría de padre',
    ancestors: 'Clase Joe',
    deptName: 'Nombre del Departamento',
    orderNum: 'Orden de visualización',
    leader: 'Persona responsable',
    phone: 'Teléfono de contacto',
    email: 'Buzón',
    status: 'Estado',
    delFlag: 'Eliminar señal',
    createBy: 'Creador',
    createTime: 'Tiempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    edit: 'Operación',
    addDept: 'Adición',
    delete: 'Eliminar',
    search: 'Búsqueda',
    add: 'Adición',
    export: 'Exportación',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    editMenu: 'Editar menú'
  },
  posttable: {
    id: 'Número',
    postId: 'Número de puesto',
    postCode: 'Código de posición',
    postName: 'Nombre del puesto',
    Order: 'Orden de visualización',
    status: 'Estado',
    createDate: 'Tiempo de creación',
    edit: 'Operación',
    delete: 'Eliminar',
    postSort: 'Orden de visualización',
    remark: 'Observaciones',
    createBy: 'Creador',
    createTime: 'Tiempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    actions: 'Operación',
    addDept: 'Adición',
    search: 'Búsqueda',
    add: 'Adición',
    export: 'Exportación',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    editMenu: 'Editar menú'
  },
  dicttypetable: {
    id: 'Número',
    dictId: 'Clave primaria',
    dictName: 'Nombre del diccionario',
    dictType: 'Tipo de diccionario',
    status: 'Estado',
    remark: 'Observaciones',
    createDate: 'Tiempo de creación',
    createBy: 'Creador',
    createTime: 'iempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    edit: 'Operación',
    list: 'Anexos',
    delete: 'Eliminar',
    actions: 'Operación',
    export: 'Exportación',
    add: 'Adición',
    confirm: 'Determinación',
    cancel: 'Cancelar',
    search: 'Búsqueda',
    editMenu: 'Editar menú',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de expiración'
  },
  dictdatatable: {
    id: 'Número',
    dictCode: 'Codificación de diccionario',
    dictSort: 'Ordenado por diccionario',
    dictLabel: 'Etiqueta de diccionario',
    dictValue: 'Teclado de diccionario',
    dictType: 'Tipo de diccionario',
    cssClass: 'Propiedades del estilo',
    listClass: 'Estilo de visualización',
    isDefault: 'Si predeterminado',
    status: 'Estado',
    remark: 'Observaciones',
    createDate: 'Tiempo de creación',
    createBy: 'Creador',
    createTime: 'iempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    edit: 'Operación',
    list: 'Anexos',
    delete: 'Eliminar',
    actions: 'Operación',
    export: 'Exportación',
    add: 'Adición',
    confirm: 'Determinación',
    cancel: 'Cancelar',
    search: 'Búsqueda',
    editMenu: 'Editar menú'
  },
  configtable: {
    id: 'Número',
    configId: 'Clave primaria',
    configName: 'Nombre del parámetro',
    configKey: 'Nombre de parámetro',
    configValue: 'Valor de parámetro',
    configType: 'Sistema interno',
    status: 'Estado',
    remark: 'Observaciones',
    createDate: 'Tiempo de creación',
    createBy: 'Creador',
    createTime: 'iempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    edit: 'Operación',
    list: 'Anexos',
    delete: 'Eliminar',
    actions: 'Operación',
    export: 'Exportación',
    add: 'Adición',
    confirm: 'Determinación',
    cancel: 'Cancelar',
    search: 'Búsqueda',
    editMenu: 'Editar menú'
  },
  noticetable: {
    id: 'Número',
    noticeId: 'ID de anuncios',
    noticeTitle: 'Título del anuncio',
    noticeType: 'Tipo de anuncio',
    noticeContent: 'Contenido del anuncio',
    status: 'Estado',
    remark: 'Observaciones',
    createDate: 'Tiempo de creación',
    createBy: 'Creador',
    createTime: 'iempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    edit: 'Operación',
    list: 'Anexos',
    delete: 'Eliminar',
    actions: 'Operación',
    export: 'Exportación',
    add: 'Adición',
    confirm: 'Determinación',
    cancel: 'Cancelar',
    search: 'Búsqueda',
    editMenu: 'Editar menú'
  },
  operlogtable: {
    id: 'Número',
    operId: 'Número de registro',
    title: 'Módulo del sistema',
    businessType: 'Tipo de negocio',
    method: 'Nombre del método',
    operatorType: 'Tipo de operación',
    operName: 'Operador M.',
    deptName: 'Nombre del Departamento',
    operUrl: 'URL.',
    operIp: 'Dirección del servidor',
    operLocation: 'Lugar de operación',
    operParam: 'Parámetros de solicitud',
    errorMsg: 'Mensaje de error',
    operTime: 'Tiempo de funcionamiento',
    status: 'Estado',
    remark: 'Observaciones',
    createDate: 'Tiempo de creación',
    createBy: 'Creador',
    createTime: 'iempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    edit: 'Operación',
    list: 'Anexos',
    delete: 'Eliminar',
    actions: 'Operación',
    export: 'Exportación',
    add: 'Adición',
    confirm: 'Determinación',
    cancel: 'Cancelar',
    search: 'Búsqueda',
    editMenu: 'Editar menú',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de expiración',
    empty: 'Vaciar',
    detailed: 'Detalle'
  },
  loginlogtable: {
    id: 'Número',
    infoId: 'Número de acceso',
    loginName: 'Número de cuenta',
    ipaddr: 'Dirección IP',
    loginLocation: 'Lugar de entrada',
    browser: 'Tipo de navegador',
    os: 'Sistema operativo',
    status: 'Estado',
    msg: 'Mensaje de pista',
    loginTime: 'Tiempo de visita',
    remark: 'Observaciones',
    createDate: 'Tiempo de creación',
    createBy: 'Creador',
    createTime: 'iempo de creación',
    updateBy: 'Actualizar vt.',
    updateTime: 'Tiempo de actualización',
    edit: 'Operación',
    list: 'Anexos',
    delete: 'Eliminar',
    actions: 'Operación',
    export: 'Exportación',
    add: 'Adición',
    confirm: 'Determinación',
    cancel: 'Cancelar',
    search: 'Búsqueda',
    editMenu: 'Editar menú',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de expiración',
    empty: '清空'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Documento de introducción'
  },
  excel: {
    export: 'Exportar',
    selectedExport: 'Exportar seleccionados',
    placeholder: 'Por favor escribe un nombre de fichero'
  },
  zip: {
    export: 'Exportar',
    placeholder: 'Por favor escribe un nombre de fichero'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading pdf.'
  },
  theme: {
    change: 'Cambiar tema',
    documentation: 'Documentación del tema',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Actualizar',
    close: 'Cerrar',
    closeOthers: 'Cerrar otros',
    closeAll: 'Cerrar todos'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  }
}
