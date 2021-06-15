// pages/search/search.js
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
let qqmapsdk = new QQMapWX({
  key: '6KHBZ-N3ZRU-KV4VG-BKRUE-VQT75-OQBZW'
});

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotCity: [{
      name: '北京',
      key: 'beijing'
    },{
      name: '上海',
      key: 'shanghai'
    },{
      name: '广州',
      key: 'guangzhou'
    },{
      name: '深圳',
      key: 'shenzhen'
    },{
      name: '杭州',
      key: 'hangzhou'
    },{
      name: '西安',
      key: 'xian'
    },{
      name: '重庆',
      key: 'chongqing'
    },{
      name: '成都',
      key: 'chengdu'
    }],
    longitude: null,
    latitude: null,
    markers: []
  },
  onLoad(options) {
    this.setData({
      ...options,
      markers: [{
        id: 1,
        ...options
      }]
    })
  },
  onShow(options) {
    this.getCityList()
  },
  // 获取城市列表
  getCityList() {
    qqmapsdk.getCityList({
      success: res => {},
      fail: function(error) {
        console.error(error);
      }
    })
  },
  // 搜索事件
  getWeather(e) {
    const searchCity = e.detail.value ? e.detail.value : e.currentTarget.dataset.city
    wx.request({
      url: `https://geoapi.qweather.com/v2/city/lookup?key=baa77a1eac2e431e811b9982f6e6ccb1&location=${searchCity}`,
      success: (res) => {
        const { code, location } = res.data
        if(code !== '200') {
          wx.showToast({
            title: code,
          })
          return
        }
        const { id: cityId, name: cityName } = location[0]
        wx.setStorageSync('cityInfo', {
          cityId,
          cityName
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })
    
  }
})