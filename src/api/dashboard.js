import request from '../utils/request'

// 获取仪表盘所有数据
export async function fetchDashboardData() {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  // 返回完整的模拟数据
  return {
    // 销售趋势数据
    salesData: [4200, 4500, 4800, 4300, 4100, 4600, 4700],

    // 订单走势数据
    orderData: {
      xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      series: [5000, 6000, 4000, 7000, 5500, 6500, 4500]
    },

    // 业务占比数据
    businessData: [
      { name: '国内业务', value: 58.54 },
      { name: '国际业务', value: 19.51 },
      { name: '快递业务', value: 11.52 },
      { name: '其他业务', value: 10.43 }
    ],

    // 平台占比数据
    platformData: [
      { name: '电商平台', value: 45 },
      { name: '线下门店', value: 25 },
      { name: '第三方', value: 30 }
    ],

    // 产品趋势数据
    productData: {
      xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
      series: [3500, 3800, 3200, 4100, 3900, 4200]
    },

    // 城市数据
    cityData: [
      { city: '北京', orders: 2147, amount: 8800 },
      { city: '上海', orders: 2017, amount: 7600 },
      { city: '广州', orders: 1800, amount: 6400 },
      { city: '深圳', orders: 1600, amount: 5900 },
      { city: '杭州', orders: 1400, amount: 5200 }
    ],

    // 重点城市数据
    keyPointData: {
      xAxis: ['北京', '上海', '广州', '深圳', '杭州', '南京', '武汉'],
      series: [30, 25, 18, 22, 15, 20, 28]
    },

    // 地球数据
    globeData: [
      {
        from: [116.4074, 39.9042], // 北京
        to: [-74.0060, 40.7128],   // 纽约
        fromName: "北京",
        toName: "纽约",
        value: 100,
        name: "北京-纽约数据流"
      },
      {
        from: [116.4074, 39.9042], // 北京
        to: [139.6917, 35.6895],   // 东京
        fromName: "北京",
        toName: "东京",
        value: 80,
        name: "北京-东京数据流"
      },
      {
        from: [116.4074, 39.9042], // 北京
        to: [2.3522, 48.8566],     // 巴黎
        fromName: "北京",
        toName: "巴黎",
        value: 70,
        name: "北京-巴黎数据流"
      },
      {
        from: [116.4074, 39.9042], // 北京
        to: [37.6173, 55.7558],    // 莫斯科
        fromName: "北京",
        toName: "莫斯科",
        value: 65,
        name: "北京-莫斯科数据流"
      },
      {
        from: [116.4074, 39.9042], // 北京
        to: [28.9784, 41.0082],    // 伊斯坦布尔
        fromName: "北京",
        toName: "伊斯坦布尔",
        value: 60,
        name: "北京-伊斯坦布尔数据流"
      },
      {
        from: [116.4074, 39.9042], // 北京
        to: [-43.1729, -22.9068],  // 里约热内卢
        fromName: "北京",
        toName: "里约热内卢",
        value: 55,
        name: "北京-里约热内卢数据流"
      },
      {
        from: [116.4074, 39.9042], // 北京
        to: [151.2093, -33.8688],  // 悉尼
        fromName: "北京",
        toName: "悉尼",
        value: 90,
        name: "北京-悉尼数据流"
      },
      {
        from: [121.4737, 31.2304], // 上海
        to: [103.8198, 1.3521],    // 新加坡
        fromName: "上海",
        toName: "新加坡",
        value: 85,
        name: "上海-新加坡数据流"
      },
      {
        from: [121.4737, 31.2304], // 上海
        to: [77.1025, 28.7041],    // 新德里
        fromName: "上海",
        toName: "新德里",
        value: 75,
        name: "上海-新德里数据流"
      }
    ]
  };
}

// 获取销售数据
export function fetchSalesData() {
  return request({
    url: '/dashboard/sales',
    method: 'get'
  })
}

// 获取订单数据
export function fetchOrderData() {
  return request({
    url: '/dashboard/orders',
    method: 'get'
  })
}

// 模拟数据（开发阶段使用）
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
