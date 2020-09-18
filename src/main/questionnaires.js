const Rest = require('./helper/rest');

class Questionnaires extends Rest {
  async getAll({
    strStartDate,
    strEndDate,
    MedRecordNumber = '',
    EpisodeType = '',
    InstrumentIDs = '',
  }) {
    return await this.request('/GetQuestionnaires_071701', {
      strStartDate,
      strEndDate,
      MedRecordNumber,
      EpisodeType,
      InstrumentIDs,
    });
  }

  async insert({
    medicalRecordNumber,
    isMinor,
    sessionNumber,
    dateMDY,
    answers,
  }) {
    const iInstrumentID = isMinor ? 5 : 4;
    const strResponseData = answers.join('~');
    const questionnaire = {
      strPersonID: '',
      strMedicalRecordNumber: medicalRecordNumber,
      iInstrumentID,
      strClinicName: 'Shop 1',
      strCompletedByCode: 'Self',
      strSettingOfCare: 'Outpatient',
      strSessionNumber: sessionNumber,
      strAdministrationDate: dateMDY,
      strOutpatientFlag: true,
      strResponseDataType: 'byvalue',
      strResponseData,
    };
    return await this.request('/InsertQuestionnaire_081801', questionnaire);
  }
}

module.exports = Questionnaires;
