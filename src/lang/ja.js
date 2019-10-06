/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-10-06 11:39:17
 */
export default {
  route: {
    dashboard: 'トップ',
    system: 'システム',
    systemmonitoring: 'システムモニタ',
    systemtools: 'システムツール',
    systemuser: 'システムユーザ',
    systemrole: 'キャラクター管理',
    systemmenu: 'メニュー管理',
    systemdept: '部門管理',
    systempost: 'ポジション管理',
    dictionary: '辞書の管理',
    dictdata: 'データ',
    config: 'パラメータ管理',
    notice: '通知の管理',
    log: 'ログ管理',
    operlog: '操作ログ',
    loginlog: 'ログインログ',
    onlineusers: 'オンラインユーザ',
    timingtasks: 'タイム？タスク',
    datamonitoring: 'データモニタ',
    servicemonitoring: 'サービスモニタ',
    formconstruction: 'フォーム構築',
    vueeleform: 'ele-form',
    codegeneration: 'コード生成',
    systeminterface: 'システムインターフェース',
    documentation: 'ドキュメント',
    guide: 'ガイド',
    permission: '権限',
    rolePermission: '権限ロール',
    pagePermission: 'ページ権限',
    directivePermission: 'ディレクティブ権限',
    icons: 'アイコン',
    components: 'コンポーネント',
    tinymce: 'TinyMCE',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Drag-And-Drop',
    splitPane: 'パネル',
    avatarUpload: 'アバターアップロード',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'コンポーネントMixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag 看板',
    charts: 'チャート',
    keyboardChart: 'Keyboardチャート',
    lineChart: 'Lineチャート',
    mixChart: 'Mixチャート',
    CouponChart: 'クーポンチャート',
    SmsChart: 'メールの通知',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'メニュー１',
    'menu1-1': 'メニュー 1-1',
    'menu1-2': 'メニュー 1-2',
    'menu1-2-1': 'メニュー 1-2-1',
    'menu1-2-2': 'メニュー 1-2-2',
    'menu1-3': 'メニュー 1-3',
    menu2: 'メニュー 2',
    Table: 'Table',
    dynamicTable: '可変 Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit Table',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'フォーム',
    createArticle: '投稿作成',
    editArticle: '投稿編集',
    articleList: '投稿リスト',
    errorPages: 'エラーページ',
    page401: '401',
    page404: '404',
    errorLog: 'エラーログ',
    excel: 'Excel',
    exportExcel: '一括エクスポート',
    selectExcel: '複数選択エクスポート',
    mergeHeader: 'ヘッダーマージ',
    uploadExcel: 'アップロード',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'テーマ変更',
    clipboardDemo: 'Clipboard',
    i18n: '多言語',
    externalLink: '外部リンク',
    profile: 'プロフィール'
  },
  navbar: {
    dashboard: 'トップ',
    github: 'GitHub',
    logOut: 'ログアウト',
    profile: 'プロフィール',
    theme: 'テーマ変更',
    size: '画面サイズ'
  },
  login: {
    title: 'ユーザログイン',
    logIn: 'ログイン',
    userName: 'ユーザ名',
    password: 'パスワード',
    any: 'password',
    thirdparty: '外部IDでログイン',
    thirdpartyTips: 'ローカル環境ではログインできません。実装が必要です。',
    Successful_language_switching: '言語切り替え成功'
  },
  documentation: {
    documentation: 'ドキュメント',
    github: 'Github Link'
  },
  permission: {
    addRole: 'ロール追加',
    editPermission: 'ロール変更',
    roles: 'ロール',
    switchRoles: 'ロール切替',
    tips: 'v-permissionは使えない時があります。例えば: Element-UI の el-tab、 el-table-column 及び他の dom。v-ifを使う必要があります。',
    delete: '削除',
    confirm: '確認',
    cancel: 'キャンセル'
  },
  guide: {
    description: 'ガイドは各機能の説明です。',
    button: 'ガイドを見る'
  },
  components: {
    documentation: 'ドキュメント',
    tinymceTips: 'tinymceは管理画面に重要な機能ですが、その同時に落とし穴がありあす。tinymceを使う道のりが大変でした。Tinymceを使う時に各自のプロジェクト状況で判断が必要です。ドキュメントはこちら',
    dropzoneTips: 'Third partyのパッケージを使わず、独自の実装しています。詳細は @/components/Dropzone',
    stickyTips: 'ページの指定位置へスクロールした場合、表示されます。',
    backToTopTips1: 'トップへスクロールが表示されます。',
    backToTopTips2: 'ボタンのスタイルはカスタマイズできます。例えば、show/hide、height、position。 またはElementのel-tooltipを使って、ツールチップを実装できます。',
    imageUploadTips: 'mockjsは使えないため、カスタマイズしています。公式の最新バージョンを使ってください。'
  },
  table: {
    dynamicTips1: '先頭は固定、最後に追加',
    dynamicTips2: '戦後に追加せず、指定列に追加',
    dragTips1: 'デフォルト順番',
    dragTips2: 'Drag後の順番',
    title: 'タイトル',
    importance: '重要',
    type: 'タイプ',
    remark: '評価',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    reviewer: 'レビュアー',
    id: '番号',
    date: '日時',
    author: '作成者',
    readings: '閲覧数',
    status: 'ステータス',
    actions: '操作',
    edit: '編集',
    publish: '公開',
    draft: '下書き',
    delete: 'キャンセル',
    cancel: 'キャンセル',
    confirm: '確認'
  },
  usertable: {
    dynamicTips1: '先頭は固定、最後に追加',
    dynamicTips2: '戦後に追加せず、指定列に追加',
    dragTips1: 'デフォルト順番',
    dragTips2: 'Drag後の順番',
    title: 'タイトル',
    importance: '重要',
    type: 'タイプ',
    remark: '評価',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    reviewer: 'レビュアー',
    id: '番号',
    date: '日時',
    author: '作成者',
    readings: '閲覧数',
    actions: '操作',
    publish: '公開',
    draft: '下書き',
    delete: '削除',
    cancel: '取り消し',
    confirm: '確認',
    userId: 'ユーザID',
    sex: '性别',
    userName: 'アカウントに登録する',
    userNick: 'ユーザ名',
    email: '電子メール',
    dept: '部署',
    phonenumber: '携帯電話',
    status: 'ステータス',
    createDate: '作成時間',
    loginIp: '最終ログインIP',
    edit: '編集',
    discontinuation: 'アクティブ',
    enabling: '有効にする',
    remarks: 'コメント',
    password: 'パスワード',
    postName: '持ち場'
  },
  roletable: {
    id: '番号付け',
    roleId: 'キャラクター番号',
    roleName: 'キャラクター名',
    roleKey: 'パーミッション文字',
    roleSort: '順序を表示',
    displayOrder: '順序を表示',
    roleStatus: 'キャラクターの状態',
    createTime: '作成時間',
    updateTime: '変更時間',
    edit: '操作',
    dataPermissions: 'データ権限',
    actions: '操作',
    allocateUsers: 'ユーザーを割り当てる',
    delete: '削除',
    dataScope: 'データ範囲',
    remark: 'キャラクターの説明',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    title: 'タイトル',
    type: 'タイプ',
    status: 'ステータス',
    confirm: '確認',
    cancel: '取り消し',
    date: '日時',
    editRole: 'キャラクターの権限を編集',
    isDefault: 'デフォルトのキャラクター',
    menuPermissions: 'メニューのパーミッション',
    remarks: 'コメント',
    Permissions: 'パーミッション',
    deletePrompt: '本当に削除しますか？'
  },
  menutable: {
    id: '番号付け',
    menuId: 'メニューID',
    menuName: 'メニュー名',
    parentId: '親メニューID',
    orderNum: '順序を表示',
    url: '住所を要求する',
    target: '開く',
    menuType: 'メニューの種類',
    visible: 'メニューの状態',
    perms: 'パーミッション識別情報',
    icon: 'メニューアイコン',
    show: '表示',
    edit: '操作',
    addMenu: '追加',
    delete: '削除',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    remark: 'コメント',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    confirm: '確認',
    cancel: '取り消し',
    editMenu: '編集メニュー',
    i18: 'メニューコード'
  },
  depttable: {
    id: '番号付け',
    deptId: '部门ID',
    parentId: '親部門',
    ancestors: 'ブートリスト',
    deptName: '部署名',
    orderNum: '順序を表示',
    leader: '責任者',
    phone: '連絡電話',
    email: 'メールボックス',
    status: '状態',
    delFlag: 'フラグを削除',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    edit: '操作',
    addDept: '追加',
    delete: '削除',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    confirm: '確認',
    cancel: '取り消し',
    editMenu: '編集メニュー'
  },
  posttable: {
    id: '番号付け',
    postId: 'ポジション番号',
    postCode: 'ポジションコード',
    postName: 'ポジション名',
    Order: '順序を表示',
    status: '状態',
    createDate: '作成時間',
    edit: '操作',
    delete: '削除',
    postSort: '順序を表示',
    remark: 'コメント',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    actions: '操作',
    addDept: '追加',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    confirm: '確認',
    cancel: '取り消し',
    editMenu: '編集メニュー'
  },
  dictionarytable: {
    id: '番号付け',
    dictId: '辞書のキー',
    dictName: '辞書の名前',
    dictType: '辞書の種類',
    status: '状態',
    remark: 'コメント',
    createDate: '作成時間',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    edit: '操作',
    list: 'リスト',
    delete: '削除',
    actions: '操作',
    export: 'エクスポート',
    add: '追加',
    confirm: 'を選択します',
    cancel: 'キャンセル',
    search: '検索',
    editMenu: '編集メニュー',
    startDate: '開始日',
    endDate: '終了日'
  },
  dictdatatable: {
    id: '番号付け',
    dictCode: '辞書コード',
    dictSort: '辞書の並べ替え',
    dictLabel: '辞書タグ',
    dictValue: '辞書のキー',
    dictType: '辞書の種類',
    cssClass: 'スタイルの属性',
    listClass: 'リターンパターン',
    isDefault: 'デフォルトするかどうか',
    status: '状態',
    remark: 'コメント',
    createDate: '作成時間',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    edit: '操作',
    list: 'リスト',
    delete: '削除',
    actions: '操作',
    export: 'エクスポート',
    add: '追加',
    confirm: 'を選択します',
    cancel: 'キャンセル',
    search: '検索',
    editMenu: '編集メニュー'
  },
  configtable: {
    id: '序号',
    configId: 'パラメータキー',
    configName: 'パラメータ名',
    configKey: 'パラメータキー名',
    configValue: 'パラメータキー',
    configType: 'システム内蔵',
    remark: 'コメント',
    status: '状態',
    createDate: '作成時間',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    edit: '操作',
    list: 'リスト',
    delete: '削除',
    actions: '操作',
    export: 'エクスポート',
    add: '追加',
    confirm: 'を選択します',
    cancel: 'キャンセル',
    search: '検索',
    editMenu: '編集メニュー'
  },
  noticetable: {
    id: '番号付け',
    noticeId: '公告ID',
    noticeTitle: '公告の概要',
    noticeType: '公告の種類',
    noticeContent: '公告の内容',
    remark: 'コメント',
    status: '状態',
    createDate: '作成時間',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    edit: '操作',
    list: 'リスト',
    delete: '削除',
    actions: '操作',
    export: 'エクスポート',
    add: '追加',
    confirm: 'を選択します',
    cancel: 'キャンセル',
    search: '検索',
    editMenu: '編集メニュー'
  },
  operlogtable: {
    id: '番号付け',
    operId: 'ログ番号',
    title: 'システムモジュール',
    businessType: 'ビジネスタイプ',
    method: 'メソッド名',
    operatorType: '操作の種類',
    operName: '作業員',
    deptName: '部署名',
    operUrl: 'URLを要求します',
    operIp: 'ホストアドレス',
    operLocation: '操作場所',
    operParam: '要求パラメータ',
    errorMsg: 'エラーメッセージ',
    operTime: '操作時間',
    remark: 'コメント',
    status: '状態',
    createDate: '作成時間',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    edit: '操作',
    list: 'リスト',
    delete: '削除',
    actions: '操作',
    export: 'エクスポート',
    add: '追加',
    confirm: 'を選択します',
    cancel: 'キャンセル',
    search: '検索',
    editMenu: '編集メニュー',
    startDate: '開始日',
    endDate: '終了日',
    empty: '空をクリア',
    detailed: '詳細'
  },
  loginlogtable: {
    id: '番号付け',
    infoId: 'アクセス番号',
    loginName: 'ログインID',
    ipaddr: 'IPアドレスを登録する',
    loginLocation: '場所を登録する',
    browser: 'ブラウザのタイプ',
    os: 'オペレーティングシステム',
    msg: 'ヒントメッセージ',
    loginTime: 'アクセス時間',
    status: '状態',
    createDate: '作成時間',
    createBy: '建設者',
    createTime: '作成時間',
    updateBy: '更新者',
    updateTime: '更新日時',
    edit: '操作',
    list: 'リスト',
    delete: '削除',
    actions: '操作',
    export: 'エクスポート',
    add: '追加',
    confirm: 'を選択します',
    cancel: 'キャンセル',
    search: '検索',
    editMenu: '編集メニュー',
    startDate: '開始日',
    endDate: '終了日',
    empty: '空をクリア'
  },
  onlineUsers: {
    operationUser: '操作ユーザ',
    queryAllOnline: 'すべてのオンライン検索',
    includingVisitorUsers: '旅行者を含む',
    search: '検索',
    refresh: '更新'
  },
  example: {
    warning: '新規作成と編集画面は keep-alive を使えないです。keep-alive の include はrouteのキャッシュは使えないです。そのため、component name を使ってキャッシュさせるようにします。このようなキャッシュ機能を作りたい場合，localStorageを使う手があります。もしくは keep-alive の includeを使って、全ページキャッシュする方法はあります。'
  },
  errorLog: {
    tips: '右上のbugアイコンをクリックしてください。',
    description: '管理画面はspaを使う場合が多い、ユーザ体現向上はできますが、想定外エラーが発生する場合があります。Vueはそのエラーハンドリング機能を提供し、エラーレポートができます。',
    documentation: 'ドキュメント'
  },
  excel: {
    export: 'エクスポート',
    selectedExport: 'エクスポート対象を選択してください。',
    placeholder: 'ファイル名を入力してください。'
  },
  zip: {
    export: 'エクスポート',
    placeholder: 'ファイル名を入力してください。'
  },
  pdf: {
    tips: 'window.print() を使ってPDFダウンロードしています。'
  },
  theme: {
    change: 'テーマ切替',
    documentation: 'ドキュメント',
    tips: 'Tips: テーマの切り替え方法はnavbarのtheme-pickと異なります、使い方はドキュメントを確認してください。'
  },
  tagsView: {
    refresh: '更新',
    close: '閉じる',
    closeOthers: 'その他閉じる',
    closeAll: 'すべて閉じる'
  },
  settings: {
    title: 'システムテーマ',
    theme: 'テーマ色',
    tagsView: 'Tags-View 開く',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  currency: {
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    status: '状態',
    startDate: '開始時間',
    endDate: '終了時間'
  }
}
