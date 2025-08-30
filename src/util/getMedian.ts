export function getMedian(values: number[]): number {
  const n = values.length;

  if (n === 0) {
    throw new Error('无法计算空数组的中位数');
  }

  // 对于偶数个元素，取中间两个元素的平均值
  if (n % 2 === 0) {
    return (values[n / 2 - 1] + values[n / 2]) / 2;
  }

  // 对于奇数个元素，返回中间元素
  return values[Math.floor(n / 2)];
}