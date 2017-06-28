var sendRrquest = function (url, controller, date) {
    var promise = new Promise(function (resolve, reject) {
        wx.request({
            url: url+controller, 
            data: { taken: "83f2e904ceec91d935593895e2d2dbfe", author: "goduer",date:date },
            method: "POST",
            header: {
           'content-type': 'application/json'
            },
            success: resolve,
            fail: reject
        })
    });
    return promise;
};

module.exports.sendRrquest = sendRrquest 