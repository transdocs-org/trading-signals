import {IndicatorSeries} from '../../types/Indicator.js';
import type {MovingAverage} from '../../trend/MA/MovingAverage.js';
import type {MovingAverageTypes} from '../../trend/MA/MovingAverageTypes.js';
import {TR} from '../TR/TR.js';
import type {HighLowClose} from '../../types/HighLowClose.js';
import {WSMA} from '../../trend/WSMA/WSMA.js';

/**
 * 平均真实波幅 (ATR)
 * 类型：波动性
 *
 * ATR 由 John Welles Wilder（小威尔斯·威尔德）提出。其核心理念是“波幅”能够反映交易者的投入或热情程度。波幅较大或持续扩大，说明交易者愿意在一天中不断加价买入或压价卖出；波幅缩小则表明兴趣减退。
 *
 * 较高的 ATR 代表波动率上升，较低的 ATR 表示在所评估的时间段内波动率下降。
 *
 * - 低 ATR（例如 0.5 至 1）：通常对应低波动性的股票或市场，价格走势相对平稳。
 *
 * - 中等 ATR（例如 1 至 2）：表示中等波动率，价格会出现周期性波动，但幅度不大。许多交易者认为 ATR 在 2 左右的股票风险可控，适合交易。
 *
 * - 高 ATR（例如 2 或更高）：暗示高波动率，ATR 超过 2 的股票容易出现显著的价格摆动，波动幅度更大。
 *
 * @see https://www.investopedia.com/terms/a/atr.asp
 */
export class ATR extends IndicatorSeries<HighLowClose<number>> {
  private readonly tr: TR;
  private readonly smoothing: MovingAverage;

  constructor(
    public readonly interval: number,
    SmoothingIndicator: MovingAverageTypes = WSMA
  ) {
    super();
    this.tr = new TR();
    this.smoothing = new SmoothingIndicator(interval);
  }

  override getRequiredInputs() {
    return this.smoothing.getRequiredInputs();
  }

  update(candle: HighLowClose<number>, replace: boolean) {
    const trueRange = this.tr.update(candle, replace);
    this.smoothing.update(trueRange, replace);
    if (this.smoothing.isStable) {
      return this.setResult(this.smoothing.getResultOrThrow(), replace);
    }

    return null;
  }
}