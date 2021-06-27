const jwt = require('jsonwebtoken');
const verifytoken = (token) => {
    try {
        var decoded = jwt.verify(token, 'privatekey');
      } catch(err) {
        // err
      }
}