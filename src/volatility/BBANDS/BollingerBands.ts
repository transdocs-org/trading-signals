import {TechnicalIndicator} from '../../types/Indicator.js';
import type {BandsResult} from '../../types/BandsResult.js';
import {getAverage, getStandardDeviation, pushUpdate} from '../../util/index.js';

/**
 * 布林带 (BBANDS)
 * 类型：波动性
 *
 * 布林带 (BBANDS) 由 John A. Bollinger 提出，是在移动平均线上下设置的包络线。窄带表示横盘趋势（区间市场）。为了判断突破方向，[Investopia.com 建议](https://www.investopedia.com/articles/technical/04/030304.asp) 结合使用相对强弱指数 (RSI) 以及一个或两个基于成交量的指标，如 David Bostian 开发的日内强度指数或 Larry William 开发的累积/派发指标。
 *
 * 当上轨和下轨扩张时，可能出现“M”形和“W”形形态。“W”形表示看涨走势，“M”形表示看跌走势。
 *
 * @see https://www.investopedia.com/terms/b/bollingerbands.asp
 */
export class BollingerBands extends TechnicalIndicator<BandsResult, number> {
  public readonly prices: number[] = [];

  constructor(
    public readonly interval: number,
    public readonly deviationMultiplier: number = 2
  ) {
    super();
  }

  override getRequiredInputs() {
    return this.interval;
  }

  update(price: number, replace: boolean) {
    const dropOut = pushUpdate(this.prices, replace, price, this.interval);

    if (dropOut) {
      const middle = getAverage(this.prices);
      const standardDeviation = getStandardDeviation(this.prices, middle);

      return (this.result = {
        lower: middle - standardDeviation * this.deviationMultiplier,
        middle,
        upper: middle + standardDeviation * this.deviationMultiplier,
      });
    }

    return null;
  }
}