export default {
  routes: {
    home: {
      welcome: '欢迎'
    },
    about: {
      about: '关于'
    },
    account: {
      account: '账户',
      password: '密码',
      settings: '设置'
    }
  },
  common: {
    success: '操作成功 !',
    okText: '确认',
    closeText: '关闭',
    cancelText: '取消',
    loadingText: '加载中...',
    saveText: '保存',
    delText: '删除',
    resetText: '重置',
    searchText: '搜索',
    queryText: '查询',

    inputText: '请输入',
    chooseText: '请选择',

    redo: '刷新',
    back: '返回',

    light: '亮色主题',
    dark: '黑暗主题'
  },
  components: {
    login: {
      title: '登录',
      username: '用户名',
      password: '密码',
      rememberme: '记住我',
      okText: '登录'
    },
    user: {
      login: '登录',
      register: '注册',
      settings: '设置',
      pwdChange: '修改密码',
      logout: '退出'
    }
  },
  views: {
    password: {
      title: '修改密码',
      currentPassword: '当前密码',
      newPassword: '新密码',
      confirmPassword: '新密码确认',
      confirmBtn: '保存',
      placeholder: {
        currentPassword: '请输入当前密码',
        newPassword: '请输入新密码',
        confirmPassword: '请再次输入密码'
      }
    },
    settings: {
      title: '用户设置',
      firstName: '名字',
      lastName: '姓氏',
      email: '电子邮件',
      confirmBtn: '保存'
    }
  }
}
