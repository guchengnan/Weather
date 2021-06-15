// index.js
// 获取应用实例
const app = getApp()
import { formatTime } from '../../utils/util'
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
const qqmapsdk = new QQMapWX({
  key: '6KHBZ-N3ZRU-KV4VG-BKRUE-VQT75-OQBZW'
})

Page({
  data: {
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    // 用户信息
    userInfo: {},
    // 天气信息
    weatherInfo: {},
    // 经纬度
    latitude: null,
    longitude: null
  },
  // 事件处理函数
  onLoad() {
    this.getLocation()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow() {
    this.getWeather()
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        const { latitude, longitude } = res
        this.setData({
          latitude,
          longitude
        })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: res => {}
        })
      }
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
    const { latitude, longitude } = this.data
    wx.navigateTo({
      url: `/pages/search/search?latitude=${latitude}&longitude=${longitude}`,
    })
  }
})
