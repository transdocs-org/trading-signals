import {TechnicalIndicator} from '../../types/Indicator.js';
import {SMA} from '../../trend/SMA/SMA.js';
import type {HighLowClose} from '../../types/HighLowClose.js';
import {pushUpdate} from '../../util/pushUpdate.js';

export interface StochasticResult {
  /** 慢速随机指标 (%D) */
  stochD: number;
  /** 快速随机指标 (%K) */
  stochK: number;
}

/**
 * 随机震荡指标 (STOCH)
 * 类型: 动量指标
 *
 * 随机震荡指标由 George Lane 开发，数值范围在 0 到 100 之间。该指标试图预测价格转折点。
 * 当数值达到 80 时，表明资产即将进入超买状态。默认使用简单移动平均线 (SMA)。
 * 当动量开始减缓时，随机震荡指标的数值开始下降。在上升趋势中，价格往往创出更高的高点，
 * 收盘价通常位于该时间段交易区间的上端。
 *
 * 随机指标 k (%k) 表示当前收盘价与该周期价格区间（最高/最低）之间的关系，
 * 有时被称为"快速"随机周期 (fastk)。随机指标 d (%d) 表示 %k 值的移动平均值，
 * 有时被称为"慢速"周期。
 *
 * @see https://en.wikipedia.org/wiki/Stochastic_oscillator
 * @see https://www.investopedia.com/terms/s/stochasticoscillator.asp
 * @see https://tulipindicators.org/stoch
 */
export class StochasticOscillator extends TechnicalIndicator<StochasticResult, HighLowClose<number>> {
  public readonly candles: HighLowClose<number>[] = [];
  private readonly periodM: SMA;
  private readonly periodP: SMA;

  /**
   * @param n %k 周期
   * @param m %k 平滑周期
   * @param p %d 周期
   */
  constructor(
    public n: number,
    public m: number,
    public p: number
  ) {
    super();
    this.periodM = new SMA(m);
    this.periodP = new SMA(p);
  }

  override getRequiredInputs() {
    return this.n + this.p + 1;
  }

  update(candle: HighLowClose<number>, replace: boolean) {
    pushUpdate(this.candles, replace, candle, this.n);

    if (this.candles.length === this.n) {
      const highest = Math.max(...this.candles.map(candle => candle.high));
      const lowest = Math.min(...this.candles.map(candle => candle.low));
      const divisor = highest - lowest;
      let fastK = (candle.close - lowest) * 100;
      // 防止除零错误
      fastK = fastK / (divisor === 0 ? 1 : divisor);
      const stochK = this.periodM.update(fastK, replace); // (stoch_k, %k)
      const stochD = stochK && this.periodP.update(stochK, replace); // (stoch_d, %d)

      if (stochK !== null && stochD !== null) {
        return (this.result = {
          stochD,
          stochK,
        });
      }
    }

    return null;
  }
}