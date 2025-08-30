import {getMedian} from './getMedian.js';

/**
 * 计算给定数值数组的四分位数。
 *
 * @param values - 数值数组
 * @param q - 要计算的四分位：0.25（下四分位）、0.5（中位数）或 0.75（上四分位）
 * @returns 指定四分位的数值
 */
export function getQuartile(values: number[], q: 0.25 | 0.5 | 0.75): number {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  const medianIndex = Math.floor(n / 2);

  if (q === 0.25) {
    return getMedian(sorted.slice(0, medianIndex));
  } else if (q === 0.75) {
    if (n % 2 === 0) {
      // 偶数个元素：上半部分为最后 n/2 个元素
      return getMedian(sorted.slice(medianIndex));
    }
    // 奇数个元素：上半部分需排除中位数
    return getMedian(sorted.slice(medianIndex + 1));
  }
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base] + (sorted[base + 1] - sorted[base]) * rest;
}