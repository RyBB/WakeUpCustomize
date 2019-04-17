const request = require('request-promise');

exports.main = {
  getParams: (body) => { // kintoneのToDo情報を取得するためのパラメータを作るメソッド
    return {
      url: 'https://' + process.env.CYBOZU_DOMAIN + '/k/v1/records.json',
      method: 'GET',
      headers: {
        'X-Cybozu-Authorization': process.env.CYBOZU_AUTH,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
  },
  makeText: function(resp) { // テキストを整えるメソッド
    let res = JSON.parse(resp);
    let txt = '【今日のToDo】' + '\n';
    res.records.forEach((val) => {
      txt += 'ToDo名：' + val['To_Do'].value + '\n';
      txt += '優先度：' + val['Priority'].value + '\n';
      txt += '\n';
    });
    return txt;
  },
  getToDoRecords: function() { // kintoneのToDo情報を取得するメソッド
    const params = this.getParams({
      app: process.env.KINTONE_TODO_APPID,
      query: 'Duedate <= TODAY()',
      fields: ['To_Do', 'Priority'],
      totalCount: true
    });
    return request(params)
      .then(resp => {
        return this.makeText(resp);
      }).catch(err => {
        console.log(err);
      });
  },
};