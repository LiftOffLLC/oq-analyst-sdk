const Rest = require('./helper/rest');
const genderMap = { 0: 'Unknown', 1: 'Male', 2: 'Female', 9: 'Unknown' };

class Clients extends Rest {
  async getAll() {
    return await this.request('/GetAllClients');
  }

  async insert({
    medicalRecordNumber,
    firstName,
    lastName,
    dobMDY,
    gender = 0,
    isMinor,
    clinicianId = 5,
  }) {
    const Gender = genderMap[gender];
    const InstrumentCode = isMinor ? 'Y-OQ30ESR' : 'OQ30E';
    const client = {
      MedRecordNum: medicalRecordNumber,
      FirstName: firstName,
      MiddleName: '',
      LastName: lastName,
      BirthDate: dobMDY,
      Gender,
      Clinic: 'Brentwood',
      ClinicianPersonID: clinicianId,
      ClinicianCustomID: '',
      InstrumentCode,
      DefaultSettingOfCare: 'Outpatient',
      Diagnosis: 'Unknown',
      SessionNumberIncrement: '',
    };
    return await this.request('/InsertClient_081902', client);
  }

  async update({
    medicalRecordNumber,
    newMedicalRecordNumber = '',
    firstName = '',
    lastName = '',
    dobMDY = '',
    gender,
    isMinor,
    clinicianId = '',
  }) {
    const strGender = gender !== undefined ? genderMap[gender] : '';
    let strDefaultInstrumentCode = '';
    if (isMinor !== undefined) {
      strDefaultInstrumentCode = isMinor ? 'Y-OQ30ESR' : 'OQ30E';
    }
    const client = {
      strMedicalRecordNumber: medicalRecordNumber,
      strNewMedicalRecordNumber: newMedicalRecordNumber,
      strFirstName: firstName,
      strMiddleName: '',
      strLastName: lastName,
      strBirthDate: dobMDY,
      strGender,
      strClinic: '',
      strClinicianID: clinicianId,
      strClinicianCustomID: '',
      strDefaultInstrumentCode,
      strDefaultSettingOfCare: '',
      strDiagnosis: '',
      strSessionNumberIncrement: '',
    };
    return await this.request('/UpdateClient_081902', client);
  }

  async inactivate(clientId) {
    const client = {
      ClientID: clientId,
    };
    return await this.request('/InactivateClient', client);
  }

  async reactivate(clientId) {
    const client = {
      ClientID: clientId,
    };
    return await this.request('/ReactivateClient', client);
  }
}

module.exports = Clients;
