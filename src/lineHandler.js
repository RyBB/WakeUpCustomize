const request = require('request-promise');

exports.main = {
  getParams: function(body) { // LINEへ送信するためのパラメータを作成するメソッド
    return {
      url: 'https://api.line.me/v2/bot/message/push',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.LINE_CHANNEL_ACCESS_TOKEN,
      },
      body: JSON.stringify(body)
    };
  },
  postMessage: function(txt) { // LINEへ送信するメソッド
    const params = this.getParams({
      'to': process.env.LINE_USER_ID,
      'messages': [{
        'type': 'text',
        'text': txt,
      }]
    });
    return request(params)
      .then(resp => {
        console.log(resp);
      }).catch(err => {
        console.log(err);
      });
  }
};