import APIModel from '../APIModel'

export default class Config extends APIModel {
  constructor () {
    super('configurator')
  }

  async getConfigs () {
    return await this.post('', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
  }

  async createConfig (payload) {
    return await this.post('', payload)
  }

  async addComponent (payload) {
    return await this.post('/add', payload)
  }

  async deleteComponent (payload) {
    return await this.delete('', payload)
  }
}
