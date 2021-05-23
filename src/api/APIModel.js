import axios from 'axios'

export default class APIModel {
  constructor (resourceUrl = '') {
    this.resourceUrl = resourceUrl
    this.axios = axios.create(
      {
        baseURL: 'http://localhost/',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  }

  async get (url, params) {
    try {
      const response = await this.axios.get(this.resourceUrl + url, params)
      return response.data
    } catch (e) {
      throw e.data
    }
  }

  async post (url, data) {
    try {
      const response = await this.axios.post(this.resourceUrl + url, data)
      return response.data
    } catch (e) {
      throw e.data
    }
  }

  async patch (url, data) {
    try {
      const response = await this.axios.patch(this.resourceUrl + url, data)
      return response.data
    } catch (e) {
      throw e.data
    }
  }

  async put (url, data) {
    try {
      const response = await this.axios.put(this.resourceUrl + url, data)
      return response.data
    } catch (e) {
      throw e.data
    }
  }

  async delete (url, data) {
    try {
      const response = await this.axios.delete(this.resourceUrl + url, { data })
      return response.data
    } catch (e) {
      throw e.data
    }
  }
}
