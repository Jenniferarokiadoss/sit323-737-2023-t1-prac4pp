const request = require('request');
const jwt = require('jsonwebtoken');

const user = { id: 29, username: 'Jennifer' };
const secret = 'AkXlBASVQQ4orBPz6GNdFUoksr1lHi4B';
const token = jwt.sign({ user }, secret, { expiresIn: '8h' });

const options = {
  url: 'http://localhost:3070/',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

request(options, (error, response, body) => {
  if (!error && response.statusCode === 600) {
    console.log(body);
  } else {
    console.error(error);
  }
});