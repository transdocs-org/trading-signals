import {IndicatorSeries} from '../../types/Indicator.js';
import type {OpenHighLowCloseVolume} from '../../types/HighLowClose.js';
import {pushUpdate} from '../../util/pushUpdate.js';

/**
 * 能量潮指标（OBV）
 * 类型：动量指标
 *
 * 能量潮指标（OBV）是一种利用成交量流向预测股价变化的技术交易动量指标。Joseph Granville 在 1963 年的著作《Granville's New Key to Stock Market Profits》中首次提出 OBV 指标。
 *
 * @see https://www.investopedia.com/terms/o/onbalancevolume.asp
 */
export class OBV extends IndicatorSeries<OpenHighLowCloseVolume<number>> {
  public readonly candles: OpenHighLowCloseVolume<number>[] = [];

  override getRequiredInputs() {
    return 2;
  }

  update(candle: OpenHighLowCloseVolume<number>, replace: boolean) {
    pushUpdate(this.candles, replace, candle, 2);

    if (this.candles.length === 1) {
      return null;
    }

    const prevCandle = this.candles[this.candles.length - 2];
    const prevPrice = prevCandle.close;
    const prevResult = this.result ?? 0;
    const currentPrice = candle.close;
    const nextResult = currentPrice > prevPrice ? candle.volume : currentPrice < prevPrice ? -candle.volume : 0;

    return this.setResult(prevResult + nextResult, false);
  }
}