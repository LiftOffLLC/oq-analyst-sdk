const Rest = require('./helper/rest');

class Clients extends Rest {
  async getAll(data) {
    return await this.request('/GetAllClients', data);
  }
}

module.exports = Clients;
