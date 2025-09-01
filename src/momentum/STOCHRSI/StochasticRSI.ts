import {IndicatorSeries} from '../../types/Indicator.js';
import type {MovingAverage} from '../../trend/MA/MovingAverage.js';
import type {MovingAverageTypes} from '../../trend/MA/MovingAverageTypes.js';
import {RSI} from '../RSI/RSI.js';
import {SMA} from '../../trend/SMA/SMA.js';
import {Period} from '../../types/Period.js';
import {WSMA} from '../../trend/WSMA/WSMA.js';

/**
 * 随机相对强弱指标（Stochastic RSI，STOCHRSI）
 * 类型：动量指标
 *
 * Stochastic RSI 是一个在 0 到 1 之间振荡的指标，由 Tushar S. Chande 和 Stanley Kroll 开发。
 * 与 RSI 相比，Stochastic RSI 的曲线更加陡峭，经常处于极端位置（0 或 1）。它可用于识别短期趋势。
 *
 * - 返回值 ≤ 0.2 表示超卖状态
 * - 返回值 ≈ 0.5 表示市场处于中性
 * - 返回值 ≥ 0.8 表示超买状态
 * - 超买并不意味着价格将反转下跌，而是说明 RSI 达到了极端水平
 * - 超卖并不意味着价格将反转上涨，而是说明 RSI 达到了极端水平
 *
 * Stochastic RSI 通常通过其 %K（快线）与 %D（信号线）的交叉来解读。当 %K 在超卖区（< 20）上穿 %D 时，可能提示买入；当 %K 在超买区（> 80）下穿 %D 时，可能提示卖出。
 *
 * @see https://www.investopedia.com/terms/s/stochrsi.asp
 * @see https://lakshmishree.com/blog/stochastic-rsi-indicator/
 * @see https://alchemymarkets.com/education/indicators/stochastic-rsi/
 */
export class StochasticRSI extends IndicatorSeries {
  private readonly period: Period;
  private readonly rsi: RSI;

  constructor(
    public readonly interval: number,
    SmoothingRSI: MovingAverageTypes = WSMA,
    public readonly smoothing: {
      readonly k: MovingAverage;
      readonly d: MovingAverage;
    } = {
      d: new SMA(3),
      k: new SMA(3),
    }
  ) {
    super();
    this.period = new Period(interval);
    this.rsi = new RSI(interval, SmoothingRSI);
  }

  override getRequiredInputs() {
    return this.rsi.getRequiredInputs() + this.period.getRequiredInputs();
  }

  update(price: number, replace: boolean) {
    const rsiResult = this.rsi.update(price, replace);
    if (rsiResult) {
      const periodResult = this.period.update(rsiResult, replace);
      if (periodResult) {
        const min = periodResult.lowest;
        const max = periodResult.highest;
        const denominator = max - min;
        // 防止除以零：https://github.com/bennycode/trading-signals/issues/378
        if (denominator === 0) {
          return this.setResult(100, replace);
        }
        const numerator = rsiResult - min;
        const stochRSI = numerator / denominator;
        const k = this.smoothing.k.update(stochRSI, replace);
        if (k) {
          this.smoothing.d.update(k, replace);
        }
        return this.setResult(stochRSI, replace);
      }
    }

    return null;
  }
}