import APIModel from "../APIModel";

export default class Config extends APIModel {
  constructor() {
    super("configurator");
  }

  async getConfigsList() {
    return await this.get("");
  }

  async getConfigById(id) {
    return await this.get(`/${id}`);
  }

  async createConfig() {
    try {
      return await this.post("", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addComponent(payload) {
    return await this.post("/add", payload);
  }

  async deleteComponent(payload) {
    return await this.delete("", payload);
  }
}
