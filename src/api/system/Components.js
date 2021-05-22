import APIModel from '../APIModel'

export default class Components extends APIModel {
  constructor () {
    super('components')
  }

  async getComponentList (component) {
    return await this.get(`/${component}`, {})
  }

  async createComponent (payload) {
    return await this.post('', payload)
  }

  async updateComponent (payload) {
    return await this.post('/add', payload)
  }

  async deleteComponent (id) {
    return await this.delete('', { id })
  }
}
