//index.js
var request = require('../../utils/requestService.js');
//获取应用实例
var app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var url = "https://admin.cq-qq.com/wapp/wapi/";
Page({
  data: {
    dates: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    hidden: false,
    courses:[],
    coursets: [],
    courseas: []
  },
  onLoad: function () {
    //开始加载
    var that = this;
    var controller = "onload";
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    request.sendRrquest(url, controller,1)
      .then(function (response) {
        that.setData({
          courses: response.data,
          hidden: true
        });
      }, function (error) {
        console.log(error);
      });
    request.sendRrquest(url, controller, 2)
      .then(function (response) {
        that.setData({
          coursets: response.data,
        });
      }, function (error) {
        console.log(error);
      });
    request.sendRrquest(url, controller, 3)
      .then(function (response) {
        that.setData({
          courseas: response.data,
        });
      }, function (error) {
        console.log(error);
      });     
    that.getDate();
  },
  onReady: function () {
   //加载完成 
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    var that = this;
    var controller = "aftercouse";
    // console.log(e.currentTarget.id);
  },
  getDate: function(){
    var that = this;
    var controller = "getdate";
    request.sendRrquest(url, controller)
      .then(function (response) {
        that.setData({
          dates: response.data,
        });
        console.log(response);
      }, function (error) {
        console.log(error);
      });
  },
  onShareAppMessage: function () {
    // 微信分享需要的配置参数
    return {
      title: '瑜伽名师季',
      desc: '瑜伽名师季近3日课表',
      path: '/pages/index/index'
    }
    // console.log(1);
  }

});
