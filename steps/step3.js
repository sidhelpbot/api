const axios = require('axios');
const cheerio = require('cheerio');

async function scarp_tg_existing_app(stel_token) {
  const request_url = "https://my.telegram.org/apps";
  const custom_header = {
    "Cookie": stel_token
  };
  const response_c = await axios.get(request_url, { headers: custom_header });
  const response_text = response_c.data;
  const $ = cheerio.load(response_text);

  
  const title_of_page = $('title').text();
// console.log(title_of_page)
  let re_dict_vals = {};
  let re_status_id = null;

  if (title_of_page.includes("configuration")) {
    const g_inputs = $("span.input-xlarge");
    const app_id = g_inputs.eq(0).text();
    const api_hash = g_inputs.eq(1).text();
    const test_configuration = g_inputs.eq(4).text();
    const production_configuration = g_inputs.eq(5).text();
    const hi_inputs = $("p.help-block");
    const test_dc = hi_inputs.eq(-2).text().trim();
    const production_dc = hi_inputs.eq(-1).text().trim();

    re_dict_vals = {
      "App Configuration": {
        "app_id": app_id,
        "api_hash": api_hash
      },
      "Available MTProto Servers": {
        "test_configuration": {
          "IP": test_configuration,
          "DC": test_dc
        },
        "production_configuration": {
          "IP": production_configuration,
          "DC": production_dc
        }
      },
      "Disclaimer": "It is forbidden to pass this value to third parties."
    };
    re_status_id = true;
  } else {
    // console.log($("input"))
    const tg_app_hash = $("input[name='hash']").attr("value");
    re_dict_vals = {
      "tg_app_hash": tg_app_hash
    };
    re_status_id = false;
  }

  return [re_status_id, re_dict_vals];
}

module.exports = scarp_tg_existing_app