export default {
  routes: {
    home: {
      welcome: 'welcome'
    },
    about: {
      about: 'about'
    },
    account: {
      account: 'Account',
      password: 'Password',
      settings: 'Settings'
    }
  },
  common: {
    success: 'Success !',
    okText: 'OK',
    closeText: 'Close',
    cancelText: 'Cancel',
    loadingText: 'Loading...',
    saveText: 'Save',
    delText: 'Delete',
    resetText: 'Reset',
    searchText: 'Search',
    queryText: 'Search',

    inputText: 'Please enter',
    chooseText: 'Please choose',

    redo: 'Refresh',
    back: 'Back',

    light: 'Light',
    dark: 'Dark'
  },
  components: {
    login: {
      title: 'Login',
      username: 'Username',
      password: 'Password',
      rememberme: 'RememberMe',
      okText: 'Login'
    },
    user: {
      login: 'Login',
      register: 'Register',
      settings: 'Settings',
      pwdChange: 'Change Pwd',
      logout: 'Logout'
    }
  },
  views: {
    password: {
      title: 'Password',
      currentPassword: 'CurrentPassword',
      newPassword: 'NewPassword',
      confirmPassword: 'ConfirmPassword',
      confirmBtn: 'ConfirmBtn',
      placeholder: {
        currentPassword: 'CurrentPassword',
        newPassword: 'NewPassword',
        confirmPassword: 'ConfirmPassword'
      }
    }
  }
}
