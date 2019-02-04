const config = require("./config.json");

const fetch_body = (lib, action, data) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      lib,
      action,
      data,
      auth: config.auth
    })
  };
};

exports.post = (lib, action, data, callbak) => {
  fetch(config.url, fetch_body(lib, action, data))
    .then(res => res.json())
    .then(callbak);
};

exports.post_code = (lib, action, data, callbak) => {
  fetch(config.url, fetch_body(lib, action, data)).then(callbak);
};