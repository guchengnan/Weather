const cityList = require('../../utils/city')
Page({
  data: {
    cityName: '',
    resultList: []
  },
  onSearch(event) {
    const cityName = event.detail
    const resultList = cityList.filter(item => {
      return item.cityZh.indexOf(cityName) !== -1
    })
    this.setData({
      cityName,
      resultList
    })
  },
  onClickCell(event) {
    const { action } = event.currentTarget.dataset
    const { id:cityId, cityZh: cityName } = action
    wx.setStorageSync('cityInfo',{
      cityId,
      cityName
    })
    wx.navigateTo({
      url: '../index/index',
    })
  }
})