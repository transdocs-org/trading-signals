import {DX} from '../DX/DX.js';
import {IndicatorSeries} from '../../types/Indicator.js';
import type {MovingAverage} from '../MA/MovingAverage.js';
import type {MovingAverageTypes} from '../MA/MovingAverageTypes.js';
import type {HighLowClose} from '../../types/HighLowClose.js';
import {WSMA} from '../WSMA/WSMA.js';

/**
 * 平均趋向指数（ADX）
 * 类型：趋势（使用+DI和-DI）、波动率
 *
 * ADX 由 John Welles Wilder（小）开发，是一种滞后指标；也就是说，
 * 趋势必须先确立，ADX 才会发出趋势正在进行的信号。
 *
 * ADX 的取值范围为 0 至 100，因此属于振荡器。它是对方向运动
 * 指数（DMI / DX）的平滑平均值。
 *
 * 通常，ADX 读数低于 20 表示趋势疲弱，高于 40 表示趋势强劲。
 * 读数高于 50 表示非常强劲的趋势。ADX 值在 75–100 之间则意味着极端强劲的趋势。
 *
 * 解读：
 * 如果 ADX 上升，意味着波动率增加，暗示新趋势的开始。
 * 如果 ADX 下降，意味着波动率减小，当前趋势正在放缓，甚至可能
 * 反转。
 * 当 +DI 高于 -DI 时，市场上行压力大于下行压力。
 *
 * 注意：
 * ADX 的计算依赖于 DX 先稳定，才能产生有意义的结果。
 * 以周期 5 为例，至少需要 9 根 K 线。前 5 根用于稳定 DX，从而生成初始 ADX 值；
 * 随后的 4 根 K 线再产生额外的 ADX 值，使其在周期 5 的情况下用 5 个值完成稳定。
 *
 * @see https://www.investopedia.com/terms/a/adx.asp
 * @see https://en.wikipedia.org/wiki/Average_directional_movement_index
 * @see https://paperswithbacktest.com/wiki/wilders-adx-dmi-indicator-calculation-method
 * @see https://www.youtube.com/watch?v=n2J1H3NeF70
 * @see https://learn.tradimo.com/technical-analysis-how-to-work-with-indicators/adx-determing-the-strength-of-price-movement
 * @see https://medium.com/codex/algorithmic-trading-with-average-directional-index-in-python-2b5a20ecf06a
 */
export class ADX extends IndicatorSeries<HighLowClose<number>> {
  private readonly dx: DX;
  private readonly smoothed: MovingAverage;

  constructor(
    public readonly interval: number,
    SmoothingIndicator: MovingAverageTypes = WSMA
  ) {
    super();
    this.smoothed = new SmoothingIndicator(this.interval);
    this.dx = new DX(interval, SmoothingIndicator);
  }

  get mdi(): number | void {
    return this.dx.mdi;
  }

  get pdi(): number | void {
    return this.dx.pdi;
  }

  override getRequiredInputs() {
    return this.interval * 2 - 1;
  }

  update(candle: HighLowClose<number>, replace: boolean) {
    const result = this.dx.update(candle, replace);

    if (result !== null) {
      this.smoothed.update(result, replace);
    }

    if (this.smoothed.isStable) {
      return this.setResult(this.smoothed.getResultOrThrow(), replace);
    }

    return null;
  }
}