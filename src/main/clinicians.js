const Rest = require('./helper/rest');

class Clinicians extends Rest {
  async getAll(data) {
    return await this.request('/GetAllClinicians', data);
  }
}

module.exports = Clinicians;
