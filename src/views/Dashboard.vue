<template>
  <div class="dashboard">
    <!-- 头部区域 -->
    <header class="header">
      <div class="center-title">
        <main-title>数据可视化监控平台</main-title>
      </div>
    </header>

    <!-- 中间区域 -->
    <main class="content">
      <div class="main-top">
        <div class="main-top-left">
          <!-- <line-chart title="走势A" :data="orderData" />
              <pie-chart title="占比A" :data="businessData" /> -->
          <div class="box-1">
            <SubTitle title="基础指标" />
            <div class="flex basic-data">
              <div class="flex-1">
                <div class="text-center nimbus">
                  <div class="nimbus-bg"></div>
                  <div class="nimbus-content">
                    <div>
                      <counter-number
                        :total="
                          formatData(basicData.totalEnergy, 1000, 'MWh', 'kWh')
                            .num
                        "
                      />
                    </div>
                    <div class="text">
                      总裁装车容量({{
                        formatData(basicData.totalEnergy, 1000, "MWh", "kWh")
                          .unit
                      }})
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-1">
                <div class="text-center nimbus">
                  <div class="nimbus-bg"></div>
                  <div class="nimbus-content">
                    <div>
                      <counter-number
                        :total="
                          formatData(basicData.dsgTimeSum, 1000, 'kh', 'h').num
                        "
                      />
                    </div>
                    <div class="text">
                      总运行时长({{
                        formatData(basicData.dsgTimeSum, 1000, "kh", "h").unit
                      }})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-top-center">
          <div class="viewport viewport-s">
            <div class="viewport-box">
              <div class="viewport-content">
                <div class="text1">项目总数</div>
                <div class="text2">单位(个)</div>
                <div class="text3">
                  <counter-number :total="basicData.projectCount" />
                </div>
              </div>
            </div>
          </div>
          <div class="viewport viewport-m">
            <div class="viewport-box">
              <div class="viewport-content">
                <div class="text1">设备总数</div>
                <div class="text2">单位(个)</div>
                <div class="text3">
                  <counter-number :total="basicData.totalDevices" />
                </div>
              </div>
            </div>
          </div>
          <div class="viewport viewport-s">
            <div class="viewport-box">
              <div class="viewport-content">
                <div class="text1">覆盖国家</div>
                <div class="text2">单位(个)</div>
                <div class="text3">
                  <counter-number :total="basicData.deviceCityCount" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-top-right">
          <!-- <line-chart title="走势A" :data="orderData" />
              <pie-chart title="占比A" :data="businessData" /> -->
          <div class="box-1">
            <SubTitleRight title="电量指标" />
            <div class="flex basic-data">
              <div class="flex-1">
                <div class="text-center nimbus">
                  <div class="nimbus-bg"></div>
                  <div class="nimbus-content">
                    <div>
                      <counter-number
                        :total="
                          formatData(basicData.chgCapSum, 1000, 'MAh', 'Ah').num
                        "
                      />
                    </div>
                    <div class="text">
                      总充电量（{{
                        formatData(basicData.chgCapSum, 1000, "MAh", "Ah").unit
                      }}）
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-1">
                <div class="text-center nimbus">
                  <div class="nimbus-bg"></div>
                  <div class="nimbus-content">
                    <div>
                      <counter-number
                        :total="
                          formatData(basicData.dsgCapSum, 1000, 'MAh', 'Ah').num
                        "
                      />
                    </div>
                    <div class="text">
                      总放电量（{{
                        formatData(basicData.dsgCapSum, 1000, "MAh", "Ah").unit
                      }}）
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-content">
        <div class="main-side main-left">
          <div class="main-left-box">
            <pie-chart-line />
            <!-- <pie-chart title="占比A" :data="businessData" /> -->

            <div class="side-bottom">
              <SubTitle title="区域分布" />
              <Rank />
            </div>
          </div>
        </div>
        <div class="globe-visualization">
          <div class="panel-content">
            <globe-visualization :data="globeData" />
          </div>
        </div>
        <div class="main-side main-right">
          <div class="main-right-box">
            <line-chart title="充放电趋势" :data="orderData" />
            <!-- <pie-chart title="占比A" :data="businessData" /> -->
            <div class="side-bottom">
              <SubTitleRight title="社会贡献" />
              <div class="donation-container">
                <Donation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- 调试面板 -->
    <debug-panel
      :order-data="orderData"
      :product-data="productData"
      :business-data="businessData"
      :platform-data="platformData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import CircleProgress from "../components/CircleProgress.vue";
import CounterNumber from "../components/CounterNumber.vue";
import TrendChart from "../components/TrendChart.vue";
import LineChart from "../components/LineChart.vue";
// import PieChart from "../components/PieChart.vue";
import PieChartLine from "../components/PieChartLine.vue";
import GlobeVisualization from "../components/GlobeVisualization.vue";
import DataTable from "../components/DataTable.vue";
import BarChart from "../components/BarChart.vue";
import DebugPanel from "../components/DebugPanel.vue";
import {
  fetchDashboardBasicData,
  fetchDashboardVehicleData,
} from "../api/dashboard";
import MainTitle from "../components/MainTitle.vue";
import SubTitle from "../components/SubTitle.vue";
import SubTitleRight from "../components/SubTitleRight.vue";
import Rank from "../components/Rank.vue";
import Donation from "../components/Donation.vue";
// 数据定义
const salesData = ref([]);
const orderData = ref([]);
const businessData = ref([]);
const globeData = ref([]);
const platformData = ref([]);
const productData = ref([]);
const cityData = ref([]);
const keyPointData = ref([]);
const orderTotal = ref(11119);
const route = useRoute(),
  router = useRouter();
// 模拟订单总额实时增长
let orderTimer = null;

// 数据格式化函数
const formatData = (data, threshold, bigUnit, smallUnit) => {
  // 数据验证：如果不是有效数字或小于0，返回0
  if (isNaN(data) || typeof data !== "number" || data < 0) {
    return { num: 0, unit: smallUnit };
  }

  // 阈值判断：如果 data >= threshold，使用大单位；否则使用小单位
  if (data >= threshold) {
    const num = Number((data / threshold).toFixed(2));
    return { num, unit: bigUnit };
  } else {
    const num = Number(data.toFixed(2));
    return { num, unit: smallUnit };
  }
};
// 测试用例
// console.log("=== 数据格式化函数测试（优化后） ===");
// console.log("kWh -> MWh 测试:");
// console.log("500 kWh:", formatData(500, 1000, "MWh", "kWh")); // { num: 500, unit: 'kWh' }
// console.log("1000 kWh:", formatData(1000, 1000, "MWh", "kWh")); // { num: 1, unit: 'MWh' } - 优化：不显示1.00
// console.log("1500 kWh:", formatData(1500, 1000, "MWh", "kWh")); // { num: 1.5, unit: 'MWh' }
// console.log("2000 kWh:", formatData(2000, 1000, "MWh", "kWh")); // { num: 2, unit: 'MWh' } - 优化：不显示2.00

// console.log("g -> kg 测试:");
// console.log("500 g:", formatData(500, 1000, "kg", "g")); // { num: 500, unit: 'g' }
// console.log("1000 g:", formatData(1000, 1000, "kg", "g")); // { num: 1, unit: 'kg' } - 优化：不显示1.00
// console.log("2500 g:", formatData(2500, 1000, "kg", "g")); // { num: 2.5, unit: 'kg' }
// console.log("3000 g:", formatData(3000, 1000, "kg", "g")); // { num: 3, unit: 'kg' } - 优化：不显示3.00

// console.log("元 -> 万元 测试:");
// console.log("5000 元:", formatData(5000, 10000, "万元", "元")); // { num: 5000, unit: '元' }
// console.log("10000 元:", formatData(10000, 10000, "万元", "元")); // { num: 1, unit: '万元' } - 优化：不显示1.00
// console.log("150000 元:", formatData(150000, 10000, "万元", "元")); // { num: 15, unit: '万元' } - 优化：不显示15.00
// console.log("125000 元:", formatData(125000, 10000, "万元", "元")); // { num: 12.5, unit: '万元' }

// console.log("边界情况测试:");
// console.log("0:", formatData(0, 1000, "MWh", "kWh")); // { num: 0, unit: 'kWh' }
// console.log("无效数据:", formatData("abc", 1000, "MWh", "kWh")); // { num: 0, unit: 'kWh' }
// console.log("负数:", formatData(-100, 1000, "MWh", "kWh")); // { num: 0, unit: 'kWh' }
// console.log("=== 测试结束 ===");

function startOrderSimulation() {
  orderTimer = setInterval(() => {
    // 随机增加一个金额
    const increment = Math.floor(Math.random() * 500) + 100;
    orderTotal.value += increment;
  }, 5000); // 每5秒更新一次
}
const basicData = reactive({
  chgCapSum: void 0,
  deviceCityCount: void 0,
  dsgCapSum: void 0,
  dsgTimeSum: void 0,
  projectCount: void 0,
  totalDevices: void 0,
  totalEnergy: void 0,
});
const supplierId = computed(() => {
  return route.params.supplierId || route.query.supplierId;
});
const getDeviceBasicInfo = async () => {
  const res = await fetchDashboardBasicData(supplierId.value);
  console.log("[ res, ] >", res);
  if (res && res.code === 0 && res.data) {
    Object.assign(basicData, res.data);
  }
};
const getVehicleTypeDistribution = async () => {
  const res = await fetchDashboardVehicleData(supplierId.value);
  console.log("[ res, ] >", res);
  if (res && res.code === 0 && res.data) {
    //
  }
};

// 获取数据
onMounted(async () => {
  try {
    console.log("开始获取top数据...");
    getDeviceBasicInfo();
    getVehicleTypeDistribution();
    // salesData.value = data.salesData;
    // orderData.value = data.orderData;
    // businessData.value = data.businessData;
    // globeData.value = data.globeData;
    // platformData.value = data.platformData;
    // productData.value = data.productData;
    // cityData.value = data.cityData;
    // keyPointData.value = data.keyPointData;

    // console.log("数据设置完成:", {
    //   salesData: salesData.value,
    //   orderData: orderData.value,
    //   businessData: businessData.value,
    //   platformData: platformData.value,
    //   productData: productData.value,
    // });

    // 启动订单总额模拟
    startOrderSimulation();
  } catch (error) {
    console.error("获取数据失败:", error);
    // 即使获取数据失败，也启动订单总额模拟
    startOrderSimulation();
  }
});

onBeforeUnmount(() => {
  // 清除定时器
  if (orderTimer) {
    clearInterval(orderTimer);
  }
});
</script>

<style scoped lang="less">
.dashboard {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0 0.78vw; /* 20px at 2560px width */
  box-sizing: border-box;
}

.header {
  display: flex;
  height: 12vh;
  padding-bottom: 3vh; /* 20px at 1040px height */
  justify-content: center;
}
.content {
  height: 88vh;
}
.left-stats,
.right-stats {
  width: 25%;
  display: flex;
  flex-direction: column;
}

.center-title {
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 40px; */
}

.digital-counter {
  width: 80%;
  margin-top: 0.96vh; /* 10px at 1040px height */
  padding: 1.44vh 0.59vw; /* 15px at both dimensions */
  background-color: rgba(0, 20, 80, 0.3);
  border-radius: 0.39vw; /* 10px at 2560px width */
  border: 1px solid rgba(0, 228, 255, 0.3);
  box-shadow: 0 0 0.59vw rgba(0, 228, 255, 0.3); /* 15px at 2560px width */
}

.main-content {
  display: flex;
  // flex: 1; /* 占用剩余空间 */
  // min-height: ; /* 690px at 1040px height */
  height: 68vh;
  position: relative;
  z-index: 20;
  .main-left,
  .main-right {
    width: 25%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 20;
  }
}
.globe-visualization {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
}

.panel-header {
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 20, 80, 0.3);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid rgba(0, 228, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 228, 255, 0.3);
}

.panel-content {
  width: 100%;
  // height: var(--height-6xl); /* 76.92vh - 响应式高度 */
  height: 68vh; /* 76.92vh - 响应式高度 */
  background-color: rgba(0, 20, 80, 0.3);
  // border-bottom-left-radius: 10px;
  // border-bottom-right-radius: 10px;
  // border: 1px solid rgba(0, 228, 255, 0.3);
  // box-shadow: 0 0 15px rgba(0, 228, 255, 0.3);
  width: 140%;
  height: 110%;
  position: absolute;
  z-index: 30;
  left: -20%;
  top: -10%;
}

.footer {
  display: flex;
  height: 20%;
}

.data-table,
.bar-chart {
  width: 50%;
}
.basic-data {
  height: 13.4vh;
  padding-top: 1vh;
  column-gap: var(--spacing-lg); /* 1.17vw */
}
.nimbus {
  text-align: center;
  width: 100%;
  height: 12.4vh; /* 6.73vh - 响应式高度 */
  position: relative;

  .nimbus-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 2vh;
    .text {
      color: #a6f9ff;
      font-size: var(--font-md); /* 响应式字体 */
    }
    :deep(.num) {
      text-shadow: 0 0 var(--spacing-xs) rgba(2, 25, 28, 0.5);
    }
  }
  .nimbus-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: url("../assets/nimbus3.gif") no-repeat center center;
    background-size: 100% 100%;
    &::after {
      display: block;
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: url("../assets/nimbus1.png") no-repeat center center;
      background-size: 100% 100%;
      opacity: 0.02;
      z-index: 0;
    }
  }
}
@keyframes rotateRing {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.main-top {
  display: flex;
  width: 100%;
  height: 20vh; /* 210px at 1040px height */
  min-width: 200px;
  position: relative;
  z-index: 22;
  .main-top-left {
    width: 28%;
  }
  .main-top-center {
    width: 44%;
  }
  .main-top-right {
    width: 28%;
  }
}
.main-top-center {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2%;
  .viewport {
    width: 18.86%;
    .viewport-box {
      width: 100%;
      padding-top: 15.7vh;
      position: relative;
      background: url("../assets/view-bg1.png") no-repeat center center;
      background-size: 100% 100%;
      .viewport-content {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 3%;
        .text1 {
          font-size: var(--font-xl); /* 响应式字体 */
          color: #a6f9ff;
        }
        .text2 {
          font-size: var(--font-sm); /* 响应式字体 */
          color: #a6f9ff;
        }
        .text3 {
          font-size: var(--font-3xl); /* 响应式字体 */
          color: #6ae6ff;
          :deep(.num) {
            font-size: var(--font-3xl);
          }
        }
      }
    }
  }
  .viewport-m {
    width: 28.41%;
    .viewport-box {
      width: 100%;
      padding-top: 19vh;
      position: relative;
      .viewport-content {
        .text3 {
          :deep(.num) {
            font-size: var(--font-4xl); /* 响应式字体 */
          }
        }
      }
    }
  }
}
.main-left-box,
.main-right-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: var(--spacing-v-md);
}
.main-left-box {
  padding-right: 1em;
}
.main-right-box {
  padding-left: 1em;
}
/* 图表组件 - 动态分配空间 */
.main-left-box > :first-child,
.main-right-box > :first-child {
  flex: 1; /* 图表组件权重更高 */
  min-height: 0;
  overflow: hidden;
}

/* 底部组件 - 动态分配空间 */
.main-left-box > .side-bottom,
.main-right-box > .side-bottom {
  flex: 1; /* 底部组件权重较低 */
  min-height: 0;
  overflow: hidden;
}

/* 响应式调整 - 根据屏幕高度动态调整 */
@media (max-height: 900px) {
  .main-left-box > :first-child,
  .main-right-box > :first-child {
    flex: 1.2; /* 在较小屏幕上减少图表权重 */
  }
}

@media (max-height: 700px) {
  .main-left-box > :first-child,
  .main-right-box > :first-child {
    flex: 1; /* 在很小屏幕上平均分配 */
  }
}

// @media (min-height: 1200px) {
//   .main-left-box > :first-child,
//   .main-right-box > :first-child {
//     flex: 2; /* 在大屏幕上给图表更多空间 */
//   }
// }

.side-bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 100%; /* 确保占满分配的空间 */

  :deep(.title) {
    margin-bottom: var(--spacing-md);
    flex-shrink: 0; /* 标题不收缩 */
  }

  /* 确保内容组件占满剩余空间 */
  > :last-child {
    flex: 1;
    min-height: 0;
  }
}

.donation-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden; /* 防止内容溢出 */
  padding-left: 3px;
}

/* 响应式优化 */
@media (max-height: 800px) {
  .side-bottom {
    gap: var(--spacing-v-xs); /* 减少间距 */
  }

  .donation-list {
    max-height: calc(100% / 4); /* 在小屏幕上进一步限制高度 */
  }
}

@media (max-height: 600px) {
  .main-content {
    min-height: 50vh;
  }

  .donation-container {
    max-height: 30vh; /* 严格限制donation容器高度 */
  }
}
</style>
