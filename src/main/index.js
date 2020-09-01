const _ = require('lodash');
const Clinicians = require('./clinicians');
const Clients = require('./clients');
const Questionnaires = require('./questionnaires');

class OQAClient {
  constructor(config) {
    this.config = _.clone(config || {});
    this.clinicians = new Clinicians(this.config);
    this.clients = new Clients(this.config);
    this.questionnaires = new Questionnaires(this.config);
  }
}

module.exports = OQAClient;
