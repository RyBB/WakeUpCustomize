const common = {
  url: 'https://' + properties.domain + '/k/v1/record.json',
  appId: properties.appId,
  apiToken: properties.apiToken,
  userName: properties.userName
};

// レコードに設定する値
const params = {
	app: common.appId,
	record: {
		User: {
			value: [{
				code: common.userName
			}]
		}
	}
};

ajax({
  url : common.url,
  data : JSON.stringify(params),
  type : 'POST',
  contentType : 'application/json',
  dataType : 'json',
  timeout : 5000,
	headers: {
		'X-Cybozu-API-Token': common.apiToken
	},
	success: function() {
    log('success');
  },
  error: function(request, errorMessage) {
    log('error');
		log(request.responseText);
		log(errorMessage);
  }
});
return {
  resultType : 'continue'
};