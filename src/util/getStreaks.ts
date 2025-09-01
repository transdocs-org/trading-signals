export type Streak = {
  /** 连涨/连跌的连续次数 */
  length: number;
  /** 连涨/连跌期间的涨跌幅百分比 */
  percentage: number;
};

/**
 * 追踪价格连续上涨或下跌的持续时间（连涨/连跌）。
 *
 * @param prices 一系列价格
 * @param keepSide 若只想获取上涨趋势或下跌趋势
 * @returns 表示过滤后连涨/连跌的数组
 */
export function getStreaks(prices: number[], keepSide: 'up' | 'down'): Streak[] {
  const streaks: Streak[] = [];
  let currentStreak = 0;

  function saveStreak(i: number) {
    const endPrice = prices[i - 1];
    const startPrice = prices[i - currentStreak - 1];
    const percentage = ((endPrice - startPrice) / startPrice) * 100;
    streaks.push({length: currentStreak, percentage});
  }

  for (let i = 1; i < prices.length; i++) {
    const isUpward = keepSide === 'up' && prices[i] > prices[i - 1];
    const isDownward = keepSide === 'down' && prices[i] < prices[i - 1];
    if (isUpward || isDownward) {
      currentStreak++;
    } else {
      // 若连涨/连跌结束，则保存
      if (currentStreak > 0) {
        saveStreak(i);
      }
      // 重置计数
      currentStreak = 0;
    }
  }

  // 若最后仍有连涨/连跌，则追加
  if (currentStreak > 0) {
    saveStreak(prices.length);
  }

  return streaks;
}