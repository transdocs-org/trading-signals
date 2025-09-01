import {IndicatorSeries} from '../../types/Indicator.js';
import type {MovingAverage} from '../../trend/MA/MovingAverage.js';
import type {MovingAverageTypes} from '../../trend/MA/MovingAverageTypes.js';
import {pushUpdate} from '../../util/pushUpdate.js';
import {WSMA} from '../../trend/WSMA/WSMA.js';

/**
 * 相对强弱指数（RSI）
 * 类型：动量指标
 *
 * 相对强弱指数（RSI）是一个在 0 到 100 之间波动的振荡器。RSI 可用于寻找趋势反转，例如：当下跌趋势未能使 RSI 跌破 30，随后反弹突破 70，这可能意味着向上趋势反转正在发生。应使用趋势线与移动平均线来验证此类判断。
 *
 * RSI 主要适用于交替出现牛市和熊市波动的市场。
 *
 * 解读：
 * RSI 值 ≤ 30 表示超卖状态（此时不宜卖出，因供给过剩）。
 * RSI 值 ≥ 70 表示超买状态（高位卖出机会，市场可能在未来修正价格）。
 *
 * @see https://en.wikipedia.org/wiki/Relative_strength_index
 * @see https://www.investopedia.com/terms/r/rsi.asp
 */
export class RSI extends IndicatorSeries {
  private readonly previousPrices: number[] = [];
  private readonly avgGain: MovingAverage;
  private readonly avgLoss: MovingAverage;
  private readonly maxValue = 100;

  constructor(
    public readonly interval: number,
    SmoothingIndicator: MovingAverageTypes = WSMA
  ) {
    super();
    this.avgGain = new SmoothingIndicator(this.interval);
    this.avgLoss = new SmoothingIndicator(this.interval);
  }

  override getRequiredInputs() {
    return this.avgGain.getRequiredInputs();
  }

  update(price: number, replace: boolean) {
    pushUpdate(this.previousPrices, replace, price, this.interval);

    // 确保至少有两个价格用于计算
    if (this.previousPrices.length < 2) {
      return null;
    }

    const currentPrice = price;
    const previousPrice = this.previousPrices[this.previousPrices.length - 2];

    if (currentPrice > previousPrice) {
      this.avgLoss.update(0, replace);
      this.avgGain.update(price - previousPrice, replace);
    } else {
      this.avgLoss.update(previousPrice - currentPrice, replace);
      this.avgGain.update(0, replace);
    }

    if (this.avgGain.isStable) {
      const avgLoss = this.avgLoss.getResultOrThrow();
      // 防止除以零：https://github.com/bennycode/trading-signals/issues/378
      if (avgLoss === 0) {
        return this.setResult(100, replace);
      }
      const relativeStrength = this.avgGain.getResultOrThrow() / avgLoss;
      return this.setResult(this.maxValue - this.maxValue / (relativeStrength + 1), replace);
    }

    return null;
  }
}