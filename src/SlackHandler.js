const request = require('request-promise');

exports.main = {
  getParams: (body) => {
    return {
      url: process.env.SLACK_URL,
      method: 'POST',
      body: JSON.stringify(body)
    };
  },
  postMessage: function(txt) {
    const params = this.getParams({
      text: txt
    });
    return request(params)
      .then(resp => {
        console.log(resp);
      }).catch(err => {
        console.log(err);
      });
  }
};