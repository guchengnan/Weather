// index.js
// 获取应用实例
const app = getApp()
import { formatTime } from '../../utils/util'

Page({
  data: {
    canIUse: true,
    // 用户信息
    userInfo: {},
    // 天气信息
    weatherInfo: {}
  },
  // 事件处理函数
  onLoad() {},
  onShow() {
    this.getWeather()
  },
  bindGetUserInfo (e) {
    const { userInfo } = e.detail
    this.setData({
      userInfo,
      canIUse: false
    })
  },
  getWeather() {
    let cityId = '101280101'
    let cityName = '广州'
    try {
      const cityInfo = wx.getStorageSync('cityInfo')
      if (cityInfo) {
        cityId = cityInfo.cityId
        cityName = cityInfo.cityName
      }
    } catch (e) {}
    
    wx.request({
      url: `https://devapi.qweather.com/v7/weather/now?key=baa77a1eac2e431e811b9982f6e6ccb1&location=${cityId}`,
      success: (res) => {
        const { code, now, updateTime } = res.data
        if(code !== '200') {
          wx.showToast({
            title: code,
          })
          return
        }
        this.setData({
          weatherInfo: {
            ...now,
            cityName,
            obsTime: formatTime(new Date(now.obsTime))
          }
        })
      }
    })
  },
  jumpSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})
