import APIModel from '../APIModel'

export default class Auth extends APIModel {
  constructor () {
    super('auth')
  }

  async login (payload) {
    try {
      return await this.post('/login', payload);
    } catch (e) {
      localStorage.clear()
      console.log(e)
    }
  }

  async register (payload) {
    const response = await this.post('/register', payload)

    if (response.status === 401) {
      return localStorage.clear()
    }

    localStorage.setItem('username', response.username)
    localStorage.setItem('isLogIn', 'true')
    localStorage.setItem('token', response.token)

    return true
  }
}
