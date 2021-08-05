Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityId: null,
    cityName: null,
    weatherInfo: {},
    currentDate: new Date().toISOString().substr(0, 10)
  },
  onShow: function () {
    this.getWeatherInfo()
  },
  // 获取天气信息
  getWeatherInfo() {
    wx.getStorage({
      key: 'cityInfo',
      success: res => {
        const { cityId, cityName } = res.data
        this.setData({
          cityId,
          cityName
        })
      },
      fail: err => {
        this.setData({
          cityId: '101280101',
          cityName: '广州'
        })
      },
      complete: () => {
        wx.request({
          url: `https://devapi.qweather.com/v7/weather/now?key=baa77a1eac2e431e811b9982f6e6ccb1&location=${this.data.cityId}`,
          success: res => {
            const { code, now, updateTime } = res.data
            this.setData({
              weatherInfo: now
            })
          }
        })
      }
    })
  },
})