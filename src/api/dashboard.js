import request from '../utils/request'

//  设备基础信息统计
export function getDeviceBasicInfo(supplierId) {
  const url = supplierId
    ? `/powerBmsBigScreen/getDeviceBasicInfo?supplierId=${supplierId}`
    : '/powerBmsBigScreen/getDeviceBasicInfo';

  return request({
    url: url,
    method: 'get'
  })
}

// 应用领域分布/车辆类型分布

export function getVehicleTypeDistribution(supplierId) {
  const url = supplierId
    ? `/powerBmsBigScreen/getVehicleTypeDistribution?supplierId=${supplierId}`
    : '/powerBmsBigScreen/getVehicleTypeDistribution';

  return request({
    url: url,
    method: 'get'
  })
}
// 充放电趋势
export function getDeviceChargingTrend(supplierId) {
  const url = supplierId
    ? `/powerBmsBigScreen/getDeviceChargingTrend?supplierId=${supplierId}`
    : '/powerBmsBigScreen/getDeviceChargingTrend';

  return request({
    url: url,
    method: 'get'
  })
}

// 区域分布图，、/// 国家数据分布
export function getDeviceRegionRank(supplierId) {
  const url = supplierId
    ? `/powerBmsBigScreen/getDeviceRegionRank?supplierId=${supplierId}`
    : '/powerBmsBigScreen/getDeviceRegionRank';

  return request({
    url: url,
    method: 'get'
  })
}


// 社会贡献度数据
export function fetchStatisticsData(supplierId) {
  const url = supplierId
    ? `/powerBmsBigScreen/getSocialContributionDegree?supplierId=${supplierId}`
    : '/powerBmsBigScreen/getSocialContributionDegree';

  return request({
    url: url,
    method: 'get'
  })
}


// 接口定义⬆️⬆️⬆️

//  ------------------- 分割线  -------------------

// 数据获取⬇️⬇️⬇️


// 获取基础统计数据
export async function fetchDashboardBasicData(supplierId) {
  try {
    // 调用真实的统计数据接口
    const response = await getDeviceBasicInfo(supplierId);
    return response;
  } catch (error) {
    console.log('获取仪表盘数据失败:', error);
  }
}

// 获取仪表盘所有数据
export async function fetchDashboardVehicleData(supplierId) {
  try {
    // 调用真实的统计数据接口
    const response = await getVehicleTypeDistribution(supplierId);
    return response;
  } catch (error) {
    console.log('获取仪表盘数据失败:', error);
  }
}

// 获取充放电趋势数据
export async function fetchDashboardChargingData(supplierId) {
  try {
    // 调用真实的统计数据接口
    const response = await getDeviceChargingTrend(supplierId);
    return response;
  } catch (error) {
    console.log('获取充放电趋势数据失败:', error);
  }
}

// 获取区域分布/国家数据分布
export async function fetchDashboardRegionData(supplierId) {
  try {
    // 调用真实的统计数据接口
    const response = await getDeviceRegionRank(supplierId);
    return response;
  } catch (error) {
    console.log('获取区域分布数据失败:', error);
  }
}

// 获取社会贡献度数据
export async function fetchDashboardStatisticsData(supplierId) {
  try {
    // 调用真实的统计数据接口
    const response = await fetchStatisticsData(supplierId);
    return response;
  } catch (error) {
    console.log('获取社会贡献度数据失败:', error);
  }
}





