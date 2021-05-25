import APIModel from '../APIModel'

export default class Auth extends APIModel {
  constructor () {
    super('auth')
  }

  async login (payload) {
    try {
      return await this.post('/login', payload);
    } catch (e) {
      console.log(e);
    }
  }

  async register (payload) {
    try {
      return await this.post('/register', payload);
    } catch (e) {
      console.log(e);
    }
  }
}
