
// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

const users = {
  'admin': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'anan': {
    roles: ['anan'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  // {
  //   url: '/user/login',
  //   type: 'post',
  //   response: config => {
  //     const { userName } = config.body
  //     const token = tokens[userName]

  //     // mock error
  //     if (!token) {
  //       return {
  //         code: '60204',
  //         message: 'Account and password are incorrect.'
  //       }
  //     }

  //     return {
  //       code: '20000',
  //       data: token
  //     }
  //   }
  // },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      // const { token } = config.query
      // const info = users[token]
      // const info = users['anan']
      const info = users['admin']

      console.log(info)

      // mock error
      if (!info) {
        return {
          code: '50008',
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: '20000',
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: '20000',
        data: 'success'
      }
    }
  }
]
