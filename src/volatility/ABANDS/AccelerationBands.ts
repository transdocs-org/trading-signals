import {TechnicalIndicator} from '../../types/Indicator.js';
import type {MovingAverage} from '../../trend/MA/MovingAverage.js';
import type {MovingAverageTypes} from '../../trend/MA/MovingAverageTypes.js';
import {SMA} from '../../trend/SMA/SMA.js';
import type {BandsResult} from '../../types/BandsResult.js';
import type {HighLowClose} from '../../types/HighLowClose.js';

/**
 * 加速带（ABANDS）
 * 类型：波动率指标
 *
 * 由 Price Headley 创建的加速带以移动平均线为基准形成包络。上下带与中带的距离相等。
 *
 * 连续两根 K 线收盘价突破加速带，通常被视为顺势入场信号（多头或空头）。多头头寸一般会保留到第一次收盘价回到带内为止。
 *
 * @param interval 用于计算下、中、上三条移动平均线的周期
 * @param width 决定中带与上下带之间距离的系数
 * @param SmoothingIndicator 使用哪种移动平均线（SMA、EMA……）
 *
 * @see https://www.tradingtechnologies.com/xtrader-help/x-study/technical-indicator-definitions/acceleration-bands-abands/
 * @see https://www.motivewave.com/studies/acceleration_bands.htm
 * @see https://github.com/QuantConnect/Lean/blob/master/Indicators/AccelerationBands.cs
 * @see https://github.com/twopirllc/pandas-ta/blob/master/pandas_ta/volatility/accbands.py
 */
export class AccelerationBands extends TechnicalIndicator<BandsResult, HighLowClose<number>> {
  private readonly lowerBand: MovingAverage;
  private readonly middleBand: MovingAverage;
  private readonly upperBand: MovingAverage;

  constructor(
    public readonly interval: number,
    public readonly width: number,
    SmoothingIndicator: MovingAverageTypes = SMA
  ) {
    super();
    this.lowerBand = new SmoothingIndicator(interval);
    this.middleBand = new SmoothingIndicator(interval);
    this.upperBand = new SmoothingIndicator(interval);
  }

  override getRequiredInputs() {
    return this.middleBand.getRequiredInputs();
  }

  update({high, low, close}: HighLowClose<number>, replace: boolean) {
    const highPlusLow = high + low;
    const coefficient = highPlusLow === 0 ? 0 : ((high - low) / highPlusLow) * this.width;

    this.lowerBand.update(low * (1 - coefficient), replace);
    this.middleBand.update(close, replace);
    this.upperBand.update(high * (1 + coefficient), replace);

    if (this.isStable) {
      return (this.result = {
        lower: this.lowerBand.getResultOrThrow(),
        middle: this.middleBand.getResultOrThrow(),
        upper: this.upperBand.getResultOrThrow(),
      });
    }

    return null;
  }

  override get isStable(): boolean {
    return this.middleBand.isStable;
  }
}