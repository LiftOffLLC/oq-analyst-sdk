module.exports = {
  baseURL: process.env.OQ_ANALYST_BASE_URL,
  username: process.env.OQ_ANALYST_USERNAME,
  password: process.env.OQ_ANALYST_PASSWORD,
  parseOptions: {
    attributeNamePrefix: '',
    ignoreAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
  },
};
