import {IndicatorSeries} from '../../types/Indicator.js';
import type {HighLowCloseVolume} from '../../types/HighLowClose.js';

/**
 * 成交量加权平均价格（VWAP）
 * 类型：趋势指标
 *
 * 成交量加权平均价格（VWAP）表示证券在一天内交易的平均价格，该价格按成交量和价格加权计算。
 *
 * 公式：VWAP = Σ(价格 × 成交量) / 总成交量
 *
 * @see https://www.investopedia.com/terms/v/vwap.asp
 */
export class VWAP extends IndicatorSeries<HighLowCloseVolume<number>> {
  private cumulativeTypicalPriceVolume: number = 0;
  private cumulativeVolume: number = 0;
  private lastCandle: HighLowCloseVolume<number> | null = null;

  constructor() {
    super();
  }

  private calculateTypicalPriceVolume(data: HighLowCloseVolume<number>) {
    const hlc3 = (data.high + data.low + data.close) / 3;
    return hlc3 * data.volume;
  }

  override getRequiredInputs() {
    return 2;
  }

  override update(candle: HighLowCloseVolume<number>, replace: boolean) {
    // 仅在拥有成交量数据时才计算 VWAP
    if (candle.volume === 0) {
      return null;
    }

    if (replace && this.lastCandle !== null) {
      const lastTypicalPriceVolume = this.calculateTypicalPriceVolume(this.lastCandle);
      this.cumulativeTypicalPriceVolume = this.cumulativeTypicalPriceVolume - lastTypicalPriceVolume;
      this.cumulativeVolume = this.cumulativeVolume - this.lastCandle.volume;
    }

    // 缓存最新值，以备后续替换
    this.lastCandle = candle;

    const typicalPriceVolume = this.calculateTypicalPriceVolume(candle);
    this.cumulativeTypicalPriceVolume = this.cumulativeTypicalPriceVolume + typicalPriceVolume;
    this.cumulativeVolume = this.cumulativeVolume + candle.volume;

    const vwap = this.cumulativeTypicalPriceVolume / this.cumulativeVolume;
    return this.setResult(vwap, replace);
  }
}