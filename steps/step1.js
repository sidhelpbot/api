const request = require('request');

async function requestTgCodeGetRandomHash(inputPhoneNumber) {
  const requestUrl = 'https://my.telegram.org/auth/send_password';
  const requestData = {
    phone: inputPhoneNumber
  };
  
  try {
    const response = await new Promise((resolve, reject) => {
      request.post({ url: requestUrl, formData: requestData }, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
    
    const jsonResponse = JSON.parse(response.body);
    const randomHash = jsonResponse.random_hash;
    return randomHash;
  } catch (error) {
    throw new Error(`Failed to get random hash for phone number ${inputPhoneNumber}: ${error.message}`);
  }
}

module.exports = requestTgCodeGetRandomHash;
