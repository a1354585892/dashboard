export const formatData = (data, threshold, bigUnit, smallUnit) => {
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