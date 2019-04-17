const request = require('request-promise');
const moment = require('moment');

module.exports.main = {
  getUserParams: function(body) { // GaroonのUserIDを取得するためのパラメータを作るメソッド
    return {
      url: 'https://' + process.env.CYBOZU_DOMAIN + '/g/api/v1/base/users?name=' + body,
      method: 'GET',
      headers: {
        'X-Cybozu-Authorization': process.env.CYBOZU_AUTH,
      }
    };
  },
  getScheduleParams: function(body) { // Garoonのスケジュールを取得するためのパラメータを作るメソッド
    return {
      url: 'https://' + process.env.CYBOZU_DOMAIN + '/g/api/v1/schedule/events?' + body,
      method: 'GET',
      headers: {
        'X-Cybozu-Authorization': process.env.CYBOZU_AUTH,
      }
    };
  },
  makeText: function(resp) { // テキストを整えるメソッド
    let txt = '【今日の予定】' + '\n';
    let res = JSON.parse(resp);
    res.events.forEach((val) => {
      txt += moment(val.start.dateTime).format('hh:mm') + '-' + moment(val.end.dateTime).format('hh:mm') + '\n';
      txt += val.eventMenu + ' : ' + val.subject + '\n';

      // 会社情報が記載されている場合、それも追記する
      if (val.companyInfo.name) {
        txt += '<会社情報>' + '\n';
        txt += val.companyInfo.name + '\n';
        txt += val.companyInfo.address + '\n'
      }

      txt += '\n';
    });
    return txt;
  },
  getGaroonUserId: function(code) { // GaroonのUserIDを取得するメソッド
    const params = this.getUserParams(code);
    return request(params)
      .then(resp => {
        return JSON.parse(resp).users[0].id;
      }).catch(err => {
        console.log(err);
      });
  },
  getSchedules: async function(e) { // Garoonのスケジュールを取得するメソッド

    // kintoneのWebhookから送られるユーザー選択のcodeを取得する
    const userCode = JSON.parse(e.body).record.User.value[0].code;

    const UserID = await this.getGaroonUserId(userCode);
    const today = moment().format('YYYY-MM-DD');
    const params = this.getScheduleParams(
      'rangeStart=' + moment(today + ' 00:00:00').utc().format() + '&' +
      'rangeEnd=' + moment(today + ' 23:59:59').utc().format() + '&' +
      'target=' + UserID + '&' +
      'targetType=user'  + '&' +
      'fields=eventMenu,subject,start,end,companyInfo' + '&' +
      'orderBy=start%20asc'
    );
    return request(params)
      .then(resp => {
        return this.makeText(resp);
      }).catch(err => {
        console.log(err);
      });
  }
};