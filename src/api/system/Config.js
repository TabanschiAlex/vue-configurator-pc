import APIModel from '../APIModel'

export default class Config extends APIModel {
  constructor () {
    super('configurator')
  }

  async getConfigs (payload) {
    return await this.post('', payload)
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
