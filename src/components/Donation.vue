<template>
  <div class="donation">
    <div
      v-for="(item, index) in listData"
      :key="index"
      class="donation-list"
      :class="'list' + index"
    >
      <div class="donation-box">
        <CounterNumber :num="item.data" />
        <div>{{ item.name }}</div>
      </div>
      <div class="donation-bg">
        <div class="glow-line"></div>
        <svg class="glow-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
          <rect
            x="0.5"
            y="0.5"
            width="99"
            height="19"
            fill="none"
            stroke="#00dceb"
            stroke-width="1"
            stroke-opacity="0.2"
          />
          <path
            id="motionPath"
            d="M0.5,0.5 H99.5 V19.5 H0.5 V0.5 Z"
            fill="none"
            stroke="none"
          />
          <circle r="0.6" fill="#00dceb">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#motionPath" />
            </animateMotion>
          </circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import CounterNumber from "./CounterNumber1.vue";
import { fetchDashboardStatisticsData } from "../api/dashboard";
import { useRoute } from "vue-router";

// 定义props接收数据
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const route = useRoute();
const supplierId = computed(() => {
  return route.params.supplierId || route.query.supplierId;
});

// 默认数据
const defaultData = [
  {
    name: "节约标准煤(kg)",
    data: 444503,
  },
  {
    name: "CO2减排量(kg)",
    data: 12374,
  },
  {
    name: "等效植树量(颗)",
    data: 8470,
  },
];

const listData = ref([...defaultData]);

// 获取社会贡献数据
async function fetchSocialContributionData() {
  try {
    const res = await fetchDashboardStatisticsData(supplierId.value);
    console.log("[ Donation组件获取社会贡献数据 res, ] >", res);
    if (res && res.code === 0 && res.data) {
      // 将接口返回的对象数据转换为数组格式
      const apiData = res.data;
      return [
        {
          name: "节约标准煤(kg)",
          data: apiData.savingCarbonEmission || 0,
        },
        {
          name: "CO2减排量(kg)",
          data: apiData.savingCarbonDioxideEmission || 0,
        },
        {
          name: "等效植树量(颗)",
          data: apiData.equivalentTreesQuantity || 0,
        },
      ];
    }
  } catch (error) {
    console.error("获取社会贡献数据失败:", error);
  }
  return defaultData;
}

// 更新数据
async function updateData() {
  if (props.data && props.data.length > 0) {
    // 使用props传入的数据
    listData.value = props.data.map((item, index) => ({
      name: item.name || defaultData[index]?.name || `项目${index + 1}`,
      data:
        item.data || item.value || item.count || defaultData[index]?.data || 0,
    }));
  } else {
    // 调用接口获取数据
    listData.value = await fetchSocialContributionData();
  }
}

// 监听props数据变化
watch(
  () => props.data,
  (newData) => {
    if (newData && newData.length > 0) {
      updateData();
    }
  },
  { deep: true }
);

// 组件挂载时获取数据
import { onMounted } from "vue";
onMounted(() => {
  updateData();
});
</script>

<style lang="less" scoped>
.donation {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1vh;
}

.donation-list {
  width: 100%;
  height: auto;
  position: relative;
  right: 2px;
  flex: 1;
  min-height: var(--height-xs);

  /* 在小屏幕上限制高度 */
  @media (max-height: 800px) {
    max-height: calc(100% / 3.5);
  }

  @media (max-height: 600px) {
    max-height: calc(100% / 4);
  }
}
.donation-box {
  text-align-last: left;
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 2;
  border-radius: 12px;
  background: linear-gradient(270deg, #005a9b 0%, #001733 100%);
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 2%;
}
.donation-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 1;
  border-radius: 12px;
  // overflow: hidden;
}
.donation-list.list0 {
  .donation-box {
    background: url("../assets/bg-9.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
.donation-list.list1 {
  .donation-box {
    background: url("../assets/bg-8.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
.donation-list.list2 {
  .donation-box {
    background: url("../assets/bg-7.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
.glow-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glow-line::before {
  content: "";
  position: absolute;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  position: absolute;
  left: -1px;
  top: -1px;
  border-radius: 12px;
  background: linear-gradient(-90deg, #00345f, #00dceb);
  z-index: 0;
  background-size: 200% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.glow-svg {
  position: absolute;
  inset: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  pointer-events: none;
  z-index: 1;
  border-radius: 12px;
  filter: drop-shadow(0 0 4px #00dceb) drop-shadow(0 0 8px #00dceb);
  opacity: 1;
}
</style>
