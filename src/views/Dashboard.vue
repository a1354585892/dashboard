<template>
  <div class="dashboard">
    <!-- 头部区域 -->
    <header class="header">
      <div class="center-title">
        <main-title>数据可视化监控平台</main-title>
      </div>
    </header>

    <!-- 中间区域 -->
    <main class="">
      <div class="main-top">
        <div class="main-top-left">
          <!-- <line-chart title="走势A" :data="orderData" />
              <pie-chart title="占比A" :data="businessData" /> -->
          <div class="box-1">
            <SubTitle title="这个是一个指标" />
            <div class="flex basic-data">
              <div class="flex-1">
                <div class="text-center nimbus">
                  <div class="nimbus-bg"></div>
                  <div class="nimbus-content">
                    <div><CounterNumber :value="829.2" /></div>
                    <div class="text">总裁装车容量(MWh)</div>
                  </div>
                </div>
              </div>
              <div class="flex-1">
                <div class="text-center nimbus">
                  <div class="nimbus-bg"></div>
                  <div class="nimbus-content">
                    <div><CounterNumber :value="829.2" /></div>
                    <div class="text">总运行时长(kh)</div>
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
                <div class="text3"><CounterNumber :value="829" /></div>
              </div>
            </div>
          </div>
          <div class="viewport viewport-m">
            <div class="viewport-box">
              <div class="viewport-content">
                <div class="text1">设备总数</div>
                <div class="text2">单位(个)</div>
                <div class="text3"><CounterNumber :value="829" /></div>
              </div>
            </div>
          </div>
          <div class="viewport viewport-s">
            <div class="viewport-box">
              <div class="viewport-content">
                <div class="text1">覆盖国家</div>
                <div class="text2">单位(个)</div>
                <div class="text3"><CounterNumber :value="829" /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-top-right">
          <!-- <line-chart title="走势A" :data="orderData" />
              <pie-chart title="占比A" :data="businessData" /> -->
          <div class="box-1">
            <SubTitleRight title="这个是一个指标" />
            <div class="flex basic-data">
              <div class="flex-1">
                <div class="text-center nimbus">
                  <div class="nimbus-bg"></div>
                  <div class="nimbus-content">
                    <div><CounterNumber :value="829.2" /></div>
                    <div class="text">总充电量（MAh）</div>
                  </div>
                </div>
              </div>
              <div class="flex-1">
                <div class="text-center nimbus">
                  <div class="nimbus-bg"></div>
                  <div class="nimbus-content">
                    <div><CounterNumber :value="829.2" /></div>
                    <div class="text">总放电量（MAh）</div>
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
              <Donation />
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
import { ref, onMounted, onBeforeUnmount } from "vue";
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
import { fetchDashboardData } from "../api/dashboard";
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

// 模拟订单总额实时增长
let orderTimer = null;

function startOrderSimulation() {
  orderTimer = setInterval(() => {
    // 随机增加一个金额
    const increment = Math.floor(Math.random() * 500) + 100;
    orderTotal.value += increment;
  }, 5000); // 每5秒更新一次
}

// 获取数据
onMounted(async () => {
  try {
    console.log("开始获取仪表盘数据...");
    const data = await fetchDashboardData();
    console.log("获取到的数据:", data);

    salesData.value = data.salesData;
    orderData.value = data.orderData;
    businessData.value = data.businessData;
    globeData.value = data.globeData;
    platformData.value = data.platformData;
    productData.value = data.productData;
    cityData.value = data.cityData;
    keyPointData.value = data.keyPointData;

    console.log("数据设置完成:", {
      salesData: salesData.value,
      orderData: orderData.value,
      businessData: businessData.value,
      platformData: platformData.value,
      productData: productData.value,
    });

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
  width: 100%;
  height: 100%;
  /* padding: 20px; */
  box-sizing: border-box;
}

.header {
  display: flex;
  height: 20%;
  margin-bottom: 20px;
  justify-content: center;
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
  margin-top: 10px;
  padding: 15px;
  background-color: rgba(0, 20, 80, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(0, 228, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 228, 255, 0.3);
}

.main-content {
  display: flex;
  height: 64vh;
  min-height: 690px;
  .main-left,
  .main-right {
    width: 25%;
  }
}
.globe-visualization {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 800px;
  background-color: rgba(0, 20, 80, 0.3);
  // border-bottom-left-radius: 10px;
  // border-bottom-right-radius: 10px;
  // border: 1px solid rgba(0, 228, 255, 0.3);
  // box-shadow: 0 0 15px rgba(0, 228, 255, 0.3);
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
  margin-top: 2.4rem;
  column-gap: 1.6rem;
}
.nimbus {
  text-align: center;
  width: 100%;
  padding-top: 42.58%;
  height: 6.75rem;
  position: relative;

  .nimbus-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    .text {
      color: #a6f9ff;
      font-size: 1rem;
      // margin-top: 0.3rem;
    }
    :deep(.num) {
      text-shadow: 0 0 5px rgba(2, 25, 28, 0.5);
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
  height: 19.44vh;
  min-height: 210px;
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
      padding-top: 107.5%;
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
          font-size: 1.5rem;
          color: #a6f9ff;
        }
        .text2 {
          font-size: 0.87rem;
          color: #a6f9ff;
        }
        .text3 {
          font-size: 3rem;
          color: #6ae6ff;
          :deep(.num) {
            font-size: 3rem;
          }
        }
      }
    }
  }
  .viewport-m {
    width: 28.41%;
    .viewport-box {
      width: 100%;
      padding-top: 87.5%;
      position: relative;
      .viewport-content {
        .text3 {
          :deep(.num) {
            font-size: 3.5rem;
          }
        }
      }
    }
  }
}
.side-bottom {
  margin-top: 4%;
  width: 100%;
  :deep(.title) {
    margin-bottom: 1rem;
  }
}
</style>
