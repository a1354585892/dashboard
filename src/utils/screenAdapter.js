/**
 * 大屏自适应配置
 */

// 设计稿尺寸配置
export const SCREEN_CONFIG = {
  // 设计稿宽度 - 基于大屏分辨率
  DESIGN_WIDTH: 2560,
  // 设计稿高度 - 基于大屏分辨率  
  DESIGN_HEIGHT: 1040,
  // 最小缩放比例
  MIN_SCALE: 0.3,
  // 最大缩放比例
  MAX_SCALE: 2,
  // 是否保持宽高比
  KEEP_ASPECT_RATIO: true,
  // 缩放模式: 'fit' | 'fill' | 'width' | 'height'
  // fit: 完全显示内容，可能有黑边
  // fill: 填满容器，可能裁剪内容
  // width: 按宽度缩放
  // height: 按高度缩放
  SCALE_MODE: 'fit'
}

/**
 * 计算缩放比例
 * @param {number} containerWidth 容器宽度
 * @param {number} containerHeight 容器高度
 * @param {string} mode 缩放模式
 * @returns {object} 缩放信息
 */
export function calculateScale(containerWidth, containerHeight, mode = SCREEN_CONFIG.SCALE_MODE) {
  const { DESIGN_WIDTH, DESIGN_HEIGHT, MIN_SCALE, MAX_SCALE } = SCREEN_CONFIG
  
  const scaleX = containerWidth / DESIGN_WIDTH
  const scaleY = containerHeight / DESIGN_HEIGHT
  
  let scale = 1
  
  switch (mode) {
    case 'fit':
      // 使用较小的缩放比例，确保内容完全显示
      scale = Math.min(scaleX, scaleY)
      break
    case 'fill':
      // 使用较大的缩放比例，填满容器
      scale = Math.max(scaleX, scaleY)
      break
    case 'width':
      scale = scaleX
      break
    case 'height':
      scale = scaleY
      break
    default:
      scale = Math.min(scaleX, scaleY)
  }
  
  // 限制缩放范围
  scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale))
  
  return {
    scale,
    scaleX,
    scaleY,
    width: DESIGN_WIDTH * scale,
    height: DESIGN_HEIGHT * scale,
    offsetX: (containerWidth - DESIGN_WIDTH * scale) / 2,
    offsetY: (containerHeight - DESIGN_HEIGHT * scale) / 2
  }
}

/**
 * 获取响应式字体大小
 * @param {number} baseSize 基础字体大小(px)
 * @param {number} scale 当前缩放比例
 * @returns {string} CSS字体大小
 */
export function getResponsiveFontSize(baseSize, scale) {
  return `${baseSize * scale}px`
}

/**
 * 获取响应式尺寸
 * @param {number} baseSize 基础尺寸(px)
 * @param {number} scale 当前缩放比例
 * @returns {string} CSS尺寸
 */
export function getResponsiveSize(baseSize, scale) {
  return `${baseSize * scale}px`
}

/**
 * 防抖函数
 * @param {Function} func 要防抖的函数
 * @param {number} wait 等待时间(ms)
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * 节流函数
 * @param {Function} func 要节流的函数
 * @param {number} limit 时间间隔(ms)
 * @returns {Function} 节流后的函数
 */
export function throttle(func, limit) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * 检测设备类型
 * @returns {object} 设备信息
 */
export function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase()
  const width = window.innerWidth
  const height = window.innerHeight
  
  return {
    isMobile: /mobile|android|iphone|ipad|phone/i.test(userAgent),
    isTablet: /tablet|ipad/i.test(userAgent),
    isDesktop: !/mobile|android|iphone|ipad|phone|tablet/i.test(userAgent),
    width,
    height,
    ratio: width / height,
    isLandscape: width > height,
    isPortrait: height > width
  }
}

/**
 * 获取最佳缩放模式
 * @returns {string} 推荐的缩放模式
 */
export function getOptimalScaleMode() {
  const device = detectDevice()
  const { width, height } = device
  
  // 如果是大屏设备且接近目标比例，使用fit模式
  if (width >= 1920 && height >= 1080) {
    const targetRatio = SCREEN_CONFIG.DESIGN_WIDTH / SCREEN_CONFIG.DESIGN_HEIGHT
    const currentRatio = width / height
    
    // 比例接近时使用fit模式
    if (Math.abs(currentRatio - targetRatio) < 0.2) {
      return 'fit'
    }
  }
  
  // 移动设备使用width模式
  if (device.isMobile) {
    return 'width'
  }
  
  // 默认使用fit模式
  return 'fit'
}
