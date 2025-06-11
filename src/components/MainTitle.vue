<template>
  <div class="title-container">
    <div class="title-wrapper">
      <div class="side-shape left-1" name="标题左侧实心梯形大"></div>
      <div class="side-shape left-2" name="标题左侧实心梯形小"></div>
      <div class="line-trapezoid line-trapezoid-l"></div>
      <div class="line-trapezoid line-trapezoid-l"></div>
      <div class="title">
        <div class="bg-img">
          <img src="../assets/t.png" alt="" srcset="" />
        </div>
        <div class="title-box">
          <div class="title-bg"></div>
          <div class="title-text">锂电池管理驾驶舱</div>
        </div>
      </div>
      <div class="side-shape right-1" name="标题右侧梯形大"></div>
      <div class="side-shape right-2" name="标题右侧梯形小"></div>
      <div class="particle-line left">
        <div class="light-line"></div>
        <div class="line-block"></div>
      </div>
      <div class="particle-line right">
        <div class="light-line"></div>
        <div class="line-block"></div>
      </div>
    </div>

    <div class="bottom-block">
      <div class="trapezoid trapezoid-l"></div>
      <div class="b-c-block"></div>
      <div class="trapezoid trapezoid-r"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.title-container {
  position: relative;
  // padding: 20px;
  // overflow: hidden;
  margin-top: 0;
  width: 100%;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}

.title {
  width: 100%;
  position: relative;
  color: #00ffff;
  font-size: 2.5rem;
  z-index: 2;
  overflow: hidden;
  .title-box {
    width: 100%;
    height: 5.5rem;
    line-height: 5.5rem;
    position: relative;
    // padding: 10px 40px;
    // overflow: hidden;
    // background: linear-gradient(
    //   0,
    //   rgba(0, 255, 255, 0.4),
    //   rgba(0, 255, 255, 0)
    // );
    clip-path: polygon(0 0, 100% 0, 92.5% 100%, 7.5% 100%);

    // border-radius: 10%;
  }
  .bg-img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .bg-box {
    padding: 10px 40px;
    overflow: hidden;
    background: linear-gradient(
      0,
      rgba(0, 255, 255, 0.4),
      rgba(0, 255, 255, 0)
    );
  }
  .title-text {
    line-height: 5.5rem;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
    z-index: 2;
  }
}

.title-bg {
  position: absolute;
  top: 100%;
  left: 0%;
  width: 100%;
  height: 30%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 255, 255, 0.05) 25%,
    rgba(0, 255, 255, 0.1) 50%,
    rgba(0, 255, 255, 0.05) 75%,
    rgba(0, 0, 0, 0) 100%
  );
  animation: chargingAnimation 3.5s infinite;
  // animation-delay: 0.4s;
  z-index: 1;
}

.title-bg-2 {
  animation-delay: 1s; /* 延迟 2 秒后才开始动画 */
}

.side-shape {
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  opacity: 1;
  top: 1rem;
  z-index: 9;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #00da85, #005a9b);
    transform: skewX(40deg);
    border-radius: 8px;
    border: 2px solid rgba(166, 249, 255, 0.6);
  }
  &.left-1 {
    right: 100%;
    margin-right: -3.2rem;
  }
  &.left-1::before {
    left: 0;
  }
  &.left-2 {
    width: 2.4rem;
    height: 2.4rem;
    right: 100%;
    margin-right: 2rem;
  }
  &.right-1 {
    left: 100%;
    margin-left: -3.2rem;
  }
  &.right-1::before {
    right: 0;
    transform: skewX(-40deg);
    background: linear-gradient(-135deg, #00da85, #005a9b);
  }
  &.right-2 {
    width: 2.4rem;
    height: 2.4rem;
    left: 100%;
    margin-left: 2rem;
  }
  &.right-2::before {
    transform: skewX(-40deg);
    background: linear-gradient(-135deg, #00da85, #005a9b);
  }
}

.particle-line {
  position: absolute;
  height: 2px;
  width: 55%;
  top: 2.4rem;
  z-index: 1;
  .light-line {
    content: "";
    position: absolute;
    width: 10rem;
    height: 100%;
    z-index: 2;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 255, 0.5) 50%,
      transparent 100%;
    );
  }
  .line-block {
    width: 10rem;
    height: 1rem;
    position: absolute;
    top: 0;
    background: transparent !important;
    // border-right: 1px solid;
    // border-bottom: 1px solid;
    // border-left: 1px solid;
  }

  &.left {
    right: 100%;
    margin-right: -3rem;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5));
    .light-line {
      animation: particleAnimation 3s infinite;
    }
    .line-block {
      right: 0;
      transform: skewX(40deg);
      border: 2px solid;
      border-image: linear-gradient(
          90deg,
          rgba(3, 120, 204, 0.5),
          rgba(0, 255, 255, 0.5)
        )
        1 1;
    }
  }

  &.right {
    left: 100%;
    margin-left: -3rem;
    background: linear-gradient(90deg, rgba(0, 255, 255, 0.5), transparent);
    .light-line {
      animation: particleAnimationReverse 3s infinite;
      background: linear-gradient(
        -90deg,
        transparent 0%,
        rgba(0, 255, 255, 0.5) 50%,
        transparent 100%;
      );
    }
    .line-block {
      left: 0;
      transform: skewX(-40deg);
      border: 2px solid;
      border-image: linear-gradient(
          90deg,
          rgba(0, 255, 255, 0.5),
          rgba(3, 120, 204, 0.5)
        )
        1 1;
    }
  }
}

@keyframes chargingAnimation {
  0% {
    // transform: translateY(92px);

    top: -30%;
    opacity: 0;
  }
  30% {
    opacity: 0.6;
  }
  80% {
    opacity: 0;
  }
  100% {
    // transform: translateY(-16px);
    top: 100%;
    opacity: 0;
  }
}

@keyframes flashAnimation {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes particleAnimation {
  0% {
    left: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
@keyframes particleAnimationReverse {
  0% {
    right: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    right: 100%;
    opacity: 0;
  }
}

.bottom-block {
  display: flex;
  justify-content: center;
  // align-items: flex-end;
  height: 2rem;
  column-gap: 20px;
  .trapezoid {
    width: 30%;
    height: 1rem;
    border: 1px solid #a6f9ff;
    border-top: transparent;
    &.trapezoid-l {
      transform: skewX(-30deg);
    }
    &.trapezoid-r {
      transform: skewX(30deg);
    }
  }
  .b-c-block {
    width: 10%;
    height: 0.6rem;
    margin-top: 0.4rem;
    background: #a6f9ff;
    border-radius: 1rem;
  }
}
</style>