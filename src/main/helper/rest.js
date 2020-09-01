const _ = require('lodash');
const axios = require('axios');
const parser = require('fast-xml-parser');
const querystring = require('querystring');
const Boom = require('@hapi/boom');
const Logger = require('./logger');
const defaultConfig = require('../config');

class Rest {
  constructor(config) {
    this.setup(_.merge(config, defaultConfig));
  }

  /**
   * @constructor
   * @memberof module:Auth
   * @param {object} config
   * @param {string} [config.baseURL] different host for authentication
   */
  setup(config) {
    /** check if empty */
    if (!config.baseURL || !config.username || !config.password) {
      throw Boom.boomify(
        new Error('baseURL or username or password is missing'),
        {
          statusCode: 400,
        },
      );
    }

    this.parseOptions = config.parseOptions;
    this.baseURL = config.baseURL;
    this.loginData = {
      strUsername: config.username,
      strPassword: config.password,
    };
    this.restOptions = {
      baseURL: config.baseURL,
      validateStatus(status) {
        return status === 200;
      },
    };

    /** initialize the axios client */
    this.client = axios.create(this.restOptions);
  }

  /**
   * @name request Makes http request and return response upon successful call, otherwise false would be returned.
   * @param {string} url
   * @param {object} data - the data to use in POST
   */
  async request(url, data = {}) {
    const { client } = this;
    const fullData = _.merge(this.loginData, data);

    /** request config */
    const config = {
      method: 'post',
      url,
      data: querystring.stringify(fullData),
    };

    Logger.info(`@liftoffllc/oq-analyst-sdk - request`, {
      url,
      data,
    });

    try {
      const response = await client.request(config);
      const jsonObj = parser.parse(response.data, this.parseOptions);
      /** can send error though its status 200 */
      if (jsonObj.Error) {
        throw Boom.boomify(new Error(jsonObj.Error));
      }

      return jsonObj;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw Boom.boomify(new Error(error.response.data), {
          statusCode: error.response.status,
        });
      }
      throw error;
    }
  }
}

module.exports = Rest;
