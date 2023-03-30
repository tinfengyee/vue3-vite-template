export default {
  common: {
    success: 'Success !',
    okText: 'OK',
    closeText: 'Close',
    cancelText: 'Cancel',
    loadingText: 'Loading...',
    saveText: 'Save',
    delText: 'Delete',
    viewText: 'View',
    editText: 'Edit',
    resetText: 'Reset',
    searchText: 'Search',
    queryText: 'Search',

    inputText: 'Please enter',
    chooseText: 'Please choose',

    refresh: 'Refresh',
    back: 'Back',

    light: 'Light',
    dark: 'Dark'
  },
  global: {
    user: {
      login: 'Login',
      login_placeholder: 'Your Login',
      firstName: 'FirstName',
      firstName_placeholder: 'Your firstName',
      lastName: 'LastName',
      lastName_placeholder: 'Your lastName',
      email: 'Email',
      email_placeholder: 'Your email',
      activated: 'Activated',
      authorities: 'Profiles',
      authorities_placeholder: 'select Profiles',
      langKey: 'Language',
      createdBy: 'Created by',
      createdDate: 'Created date',
      lastModifiedBy: 'Modified by',
      lastModifiedDate: 'Modified date',
      password: 'Password',
      password_placeholder: 'Your Password',
      currentPassword: 'CurrentPassword',
      newPassword: 'NewPassword',
      confirmPassword: 'ConfirmPassword',
      confirmPassword_placeholder: 'Your ConfirmPassword'
    }
  },
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
      settings: 'Settings',
      register: 'Register'
    },
    admin: {
      admin: 'Admin',
      user: 'UserManagement',
      swagger: 'Swagger Api'
    }
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
    Password: {
      title: 'Password',
      currentPassword: 'CurrentPassword',
      newPassword: 'NewPassword',
      confirmPassword: 'ConfirmPassword',
      confirmBtn: 'Save',
      placeholder: {
        currentPassword: 'CurrentPassword',
        newPassword: 'NewPassword',
        confirmPassword: 'ConfirmPassword'
      }
    },
    Settings: {
      title: 'User Setting',
      confirmBtn: 'Save'
    },
    Register: {
      title: 'Register',
      confirmBtn: 'Register',
      message: {
        success: 'success !'
      }
    },
    UserManagement: {
      addBtn: 'Add User',
      delBtn: {
        question: 'Are you sure to delete this?'
      },
      action: 'Action',
      login: 'Login',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      activated: 'Activated',
      deactivated: 'Deactivated',
      authorities: 'Profiles',
      authorities_placeholder: 'select Profiles',
      langKey: 'Language',
      createdBy: 'Created by',
      createdDate: 'Created date',
      lastModifiedBy: 'Modified by',
      lastModifiedDate: 'Modified date',
      dialog: {
        title: 'User'
      }
    }
  }
}
