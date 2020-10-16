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
    instrument,
    sessionNumber,
    dateMDY,
    answers,
  }) {
    const instrumentMap = {
      minor: 5,
      adult: 4,
      therapist: 112,
    };
    const iInstrumentID = instrumentMap[instrument];
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
