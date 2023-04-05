const request = require('request');

async function create_new_tg_app(stel_token, tg_app_hash, app_title, app_shortname, app_url, app_platform, app_desc) {
  const request_url = "https://my.telegram.org/apps/create";
  const custom_header = {
    "Cookie": stel_token,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
  };
  const request_data = {
    "hash": tg_app_hash,
    "app_title": app_title,
    "app_shortname": app_shortname,
    "app_url": app_url,
    "app_platform": app_platform,
    "app_desc": app_desc
  };

  try {
    const response = await new Promise((resolve, reject) => {
      request.post({
        url: request_url,
        headers: custom_header,
        form: request_data
      }, (error, response, body) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
    console.log(response)
    return response.body;
    
  } catch (error) {
    console.error(error);
    console.error(error);
    return null;
  }
}

module.exports = create_new_tg_app;

