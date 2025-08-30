import {IndicatorSeries} from '../../types/Indicator.js';
import type {MovingAverage} from '../../trend/MA/MovingAverage.js';
import type {MovingAverageTypes} from '../../trend/MA/MovingAverageTypes.js';
import {SMA} from '../../trend/SMA/SMA.js';
import type {HighLow} from '../../types/HighLowClose.js';

/**
 * 动量震荡指标 (AO)
 * 类型：动量
 *
 * 动量震荡指标 (AO) 用于衡量市场动量。
 * 由技术分析师兼图表爱好者比尔·威廉姆斯开发。
 *
 * 当 AO 向上穿越零轴时，表示短期动量上升速度超过长期动量，发出看涨买入信号。
 * 当 AO 向下穿越零轴时，表示短期动量下降速度超过长期动量，发出看跌卖出信号。
 *
 * @see https://www.tradingview.com/support/solutions/43000501826-awesome-oscillator-ao/
 * @see https://tradingstrategyguides.com/bill-williams-awesome-oscillator-strategy/
 */
export class AO extends IndicatorSeries<HighLow<number>> {
  public readonly long: MovingAverage;
  public readonly short: MovingAverage;

  constructor(
    public readonly shortInterval: number,
    public readonly longInterval: number,
    SmoothingIndicator: MovingAverageTypes = SMA
  ) {
    super();
    this.short = new SmoothingIndicator(shortInterval);
    this.long = new SmoothingIndicator(longInterval);
  }

  override getRequiredInputs() {
    return this.long.getRequiredInputs();
  }

  update({low, high}: HighLow<number>, replace: boolean) {
    const medianPrice = (low + high) / 2;

    this.short.update(medianPrice, replace);
    this.long.update(medianPrice, replace);

    if (this.long.isStable) {
      return this.setResult(this.short.getResultOrThrow() - this.long.getResultOrThrow(), replace);
    }

    return null;
  }
}