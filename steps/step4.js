let axios = require('axios');

async function create_new_tg_app(stel_token, tg_app_hash, app_title, app_shortname, app_url, app_platform, app_desc) {
  const request_url = "https://my.telegram.org/apps/create";
  const custom_header = {
    "Cookie": stel_token
  };
  console.log(tg_app_hash)
  const request_data = {
    "hash": tg_app_hash,
    "app_title": app_title,
    "app_shortname": app_shortname,
    "app_url": app_url,
    "app_platform": app_platform,
    "app_desc": app_desc
  };

  try {
    const response = await axios.post(request_url, request_data, { headers: custom_header });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
module.exports = create_new_tg_app;