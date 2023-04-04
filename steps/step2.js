const request = require('request');

async function loginStepGetStelCookie(inputPhoneNumber, tgRandomHash, tgCloudPassword) {
    const requestUrl = 'https://my.telegram.org/auth/login';
    const requestData = {
        phone: inputPhoneNumber,
        random_hash: tgRandomHash,
        password: tgCloudPassword
    };
    const response = await new Promise(resolve => {
        request.post({ url: requestUrl, formData: requestData }, (error, response, body) => {
            resolve(response);
        });
    });

    let reVal = null;
    let reStatusId = null;
    if (response.body === 'true') {
        reVal = response.headers['set-cookie'];
        reStatusId = true;
    } else {
        reVal = response.body;
        reStatusId = false;
    }
    return [reStatusId, reVal];
}

module.exports = loginStepGetStelCookie;
