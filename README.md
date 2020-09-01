# oq-analyst-sdk
NodeJS wrapper around OQ-Analyst APIs

## Installation
1. [Using PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
```shell
> yarn add git+https://token:x-oauth-basic@github.com/LiftOffLLC/oq-analyst-sdk.git#master

or

> npm install --save git+https://token:x-oauth-basic@github.com/LiftOffLLC/oq-analyst-sdk.git#master
```

2. [Using SSH](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
```shell
> yarn add git+ssh://git@github.com:LiftOffLLC/oq-analyst-sdk.git#master

or

> npm install git+ssh://git@github.com:LiftOffLLC/oq-analyst-sdk.git#master
```

## Enviroment Setup
In your .env file add the following environment variables (refer .env.example)
```javascript
OQ_ANALYST_BASE_URL = 
OQ_ANALYST_USERNAME = 
OQ_ANALYST_PASSWORD = 
```

## Sample Code
```javascript
// import the module
const OQAClient = require("@liftoffllc/oq-analyst");

// initialize the OQAClient
const client = new OQAClient();

// call method, Here fetching all clinicians
client.clinicians.getAll()
  .then(data => console.log(data))
  .catch(err => console.log(err.message));
```

## Usage
```javascript
// import module
const OQAClient = require("@liftoffllc/oq-analyst");

// initialize oq-analyst client
const client = new OQAClient();

// Clinicians
client.clinicians.getAll() // get all clinicians

// Clients
client.clients.getAll() // get all clients

// Questionnaires
const data = {
  strStartDate: '08/28/2020',
  strEndDate: '08/31/2020',
  MedRecordNumber: 'MRNTEST',
  EpisodeType: 'All',
  InstrumentIDs: '4',
};
client.questionnaires.get(data); // get questionnaires
```
** Note : This section needs to be updated as adding more features.

## Docs Links
- [OQ-Analyst REST API DOCS](https://demo.oqanalyst.com/Docs/services/exportimportservice.asmx)