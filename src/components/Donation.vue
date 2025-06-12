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
import { ref } from "vue";
import CounterNumber from "./CounterNumber1.vue";
const listData = ref([
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
]);
</script>

<style lang="less" scoped>
.donation-list {
  width: 100%;
  padding-top: 19.1%;
  position: relative;
  right: 2px;
  & + .donation-list {
    margin-top: 3%;
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
  opacity: 0.6;
}
</style>