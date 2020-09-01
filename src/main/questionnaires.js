const Rest = require('./helper/rest');

class Questionnaires extends Rest {
  async get({
    strStartDate,
    strEndDate,
    MedRecordNumber,
    EpisodeType,
    InstrumentIDs,
  }) {
    return await this.request('/GetQuestionnaires_071701', {
      strStartDate,
      strEndDate,
      MedRecordNumber,
      EpisodeType,
      InstrumentIDs,
    });
  }
}

module.exports = Questionnaires;
