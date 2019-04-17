const kintone = require('./service/kintoneHandler');
const garoon = require('./service/GaroonHandler');
const slack = require('./service/SlackHandler');
const line = require('./service/lineHandler');

module.exports.main = async (event) => {

  // Garoon and Slack
  const txt = await garoon.main.getSchedules(event);
  await slack.main.postMessage(txt);

  // kintone(ToDo) and LINE
  const text = await kintone.main.getToDoRecords();
  await line.main.postMessage(text);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'success!',
    }),
  };
};