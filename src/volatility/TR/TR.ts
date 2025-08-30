import {IndicatorSeries} from '../../types/Indicator.js';
import type {HighLowClose} from '../../types/HighLowClose.js';

/**
 * 真实波幅（TR）
 * 类型：波动性
 *
 * 真实波幅（TR）由 John Welles Wilder（小）提出。波幅（R）是一根 K 线的最高价减去最低价。
 * 如果昨天的收盘价超出了当前 K 线的范围，则真实波幅将其扩展进去。
 *
 * 返回值较低表示趋势横盘且波动性小。
 *
 * @see https://www.linnsoft.com/techind/true-range-tr
 */
export class TR extends IndicatorSeries<HighLowClose<number>> {
  private previousCandle?: HighLowClose<number>;
  private twoPreviousCandle?: HighLowClose<number>;

  override getRequiredInputs() {
    return 2;
  }

  update(candle: HighLowClose<number>, replace: boolean): number {
    const {high, low} = candle;
    const highLow = high - low;

    if (this.previousCandle && replace) {
      this.previousCandle = this.twoPreviousCandle;
    }

    if (this.previousCandle) {
      const highClose = Math.abs(high - this.previousCandle.close);
      const lowClose = Math.abs(low - this.previousCandle.close);
      this.twoPreviousCandle = this.previousCandle;
      this.previousCandle = candle;
      return this.setResult(Math.max(highLow, highClose, lowClose), replace);
    }
    this.twoPreviousCandle = this.previousCandle;
    this.previousCandle = candle;
    return this.setResult(highLow, replace);
  }
}