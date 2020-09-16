const Rest = require('./helper/rest');

class Clients extends Rest {
  async getAll() {
    return await this.request('/GetAllClients');
  }

  async insert({ firstName, lastName, dobMDY, gender, isMinor }) {
    const genderMap = { 0: 'Unknown', 1: 'Male', 2: 'Female', 9: 'Unknown' };
    const Gender = genderMap[gender];
    const InstrumentCode = isMinor ? 'Y-OQ30ESR' : 'OQ30E';
    const client = {
      MedRecordNum: '',
      FirstName: firstName,
      MiddleName: '',
      LastName: lastName,
      BirthDate: dobMDY,
      Gender,
      Clinic: 'Shop 1',
      ClinicianPersonID: '5',
      ClinicianCustomID: '',
      InstrumentCode,
      DefaultSettingOfCare: 'Outpatient',
      Diagnosis: 'Unknown',
      SessionNumberIncrement: '',
    };
    return await this.request('/InsertClient_081902', client);
  }

  async delete(id) {
    const client = {
      ClientID: id,
    };
    return await this.request('/InactivateClient', client);
  }
}

module.exports = Clients;
