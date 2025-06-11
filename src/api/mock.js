// 模拟数据
export function getMockData() {
  return {
    salesData: [4200, 4500, 4800, 4300, 4100, 4600, 4700],
    orderData: {
      xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      series: [5000, 6000, 4000, 7000, 5500, 6500, 4500]
    },
    businessData: [
      { name: '国内业务', value: 58.54 },
      { name: '国际业务', value: 19.51 },
      { name: '快递业务', value: 11.52 },
      { name: '其他业务', value: 10.43 }
    ],
    globeData: [
      { from: [116.4, 39.9], to: [121.4, 31.2], value: 100 },
      { from: [121.4, 31.2], to: [113.2, 23.1], value: 80 },
      { from: [113.2, 23.1], to: [106.5, 29.5], value: 60 }
    ],
    platformData: [
      { name: '电商平台', value: 45 },
      { name: '线下门店', value: 25 },
      { name: '第三方', value: 30 }
    ],
    productData: {
      xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
      series: [3500, 3800, 3200, 4100, 3900, 4200]
    },
    cityData: [
      { city: '北京', orders: 2147, amount: 8800 },
      { city: '上海', orders: 2017, amount: 7600 },
      { city: '广州', orders: 1800, amount: 6400 },
      { city: '深圳', orders: 1600, amount: 5900 },
      { city: '杭州', orders: 1400, amount: 5200 }
    ],
    keyPointData: {
      xAxis: ['北京', '上海', '广州', '深圳', '杭州', '南京', '武汉'],
      series: [30, 25, 18, 22, 15, 20, 28]
    }
  }
}