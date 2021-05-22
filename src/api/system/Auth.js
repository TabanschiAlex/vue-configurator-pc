import APIModel from '../APIModel'

export default class Auth extends APIModel {
  constructor () {
    super('auth')
  }

  async login (payload) {
    return await this.post('/login', payload)
  }

  async register (payload) {
    return await this.post('/register', payload)
  }
}
