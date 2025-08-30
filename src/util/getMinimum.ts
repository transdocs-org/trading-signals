export function getMinimum(values: number[]) {
  let min = Number.MAX_SAFE_INTEGER;
  // 遍历数组中的每个值
  for (const value of values) {
    // 如果当前最小值大于当前值，则更新最小值
    if (min > value) {
      min = value;
    }
  }
  // 返回最小值
  return min;
}