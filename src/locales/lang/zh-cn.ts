export default {
  common: {
    success: '操作成功 !',
    okText: '确认',
    closeText: '关闭',
    cancelText: '取消',
    loadingText: '加载中...',
    saveText: '保存',
    delText: '删除',
    viewText: '查看',
    editText: '编辑',
    resetText: '重置',
    searchText: '搜索',
    queryText: '查询',

    inputText: '请输入',
    chooseText: '请选择',

    refresh: '刷新',
    back: '返回',

    light: '亮色主题',
    dark: '黑暗主题'
  },
  global: {
    user: {
      // 可以根据需要把用户信息提取出来
      login: '登录',
      login_placeholder: '输入登录名',
      firstName: '名字',
      firstName_placeholder: '您的名字',
      lastName: '姓氏',
      lastName_placeholder: '您的姓氏',
      email: '邮箱',
      email_placeholder: '您的邮箱',
      activated: '已激活',
      authorities: '角色',
      authorities_placeholder: '选择角色',
      langKey: '语言',
      createdBy: '创建人',
      createdDate: '创建时间',
      lastModifiedBy: '最近修改人',
      lastModifiedDate: '最近修改时间',
      password: '密码',
      password_placeholder: '您的密码',
      currentPassword: '当前密码',
      newPassword: '新密码',
      confirmPassword: '新密码确认',
      confirmPassword_placeholder: '确认您的新密码'
    }
  },
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
      settings: '设置',
      register: '用户注册'
    },
    admin: {
      admin: '管理',
      user: '用户管理',
      swagger: 'Swagger Api'
    }
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
    Password: {
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
    Settings: {
      title: '用户设置',
      confirmBtn: '保存'
    },
    Register: {
      title: '用户注册',
      confirmBtn: '注册',
      message: {
        success: '注册成功'
      }
    },
    UserManagement: {
      addBtn: '新增用户',
      delBtn: {
        question: '你确定要删除用户?'
      },
      action: '操作',
      login: '登录',
      firstName: '名字',
      lastName: '姓氏',
      email: '电子邮件',
      activated: '已激活',
      deactivated: '失效',
      authorities: '角色',
      authorities_placeholder: '选择角色',
      langKey: '语言',
      createdBy: '创建人',
      createdDate: '创建时间',
      lastModifiedBy: '最近修改人',
      lastModifiedDate: '最近修改时间',
      dialog: {
        title: '用户'
      }
    }
  }
}
