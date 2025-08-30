import {IndicatorSeries} from '../../types/Indicator.js';
import {MAD} from '../../volatility/MAD/MAD.js';
import {SMA} from '../../trend/SMA/SMA.js';
import {pushUpdate} from '../../util/index.js';
import type {HighLowClose} from '../../types/HighLowClose.js';

/**
 * 商品通道指数 (CCI)
 * 类型：动量指标
 *
 * 商品通道指数（CCI）由 Donald Lambert 于 1980 年提出，用于比较当前平均价格与一段时间内的
 * 平均价格。大约 70% 到 80% 的 CCI 值落在 −100 到 +100 之间，因此它被视为一种震荡指标。
 * 当值高于 +100 时，表示超买；低于 −100 时，表示超卖。
 *
 * 根据
 * [Investopia.com](https://www.investopedia.com/articles/active-trading/031914/how-traders-can-utilize-cci-commodity-channel-index-trade-stock-trends.asp#multiple-timeframe-cci-strategy)，
 * 交易者通常在 CCI 跌破 −100 后重新回升至 −100 以上时买入，在突破 +100 后再次跌回 +100 以下时卖出。
 *
 * 解读：
 * −100 及以下：表示超卖状态或强烈下跌趋势的开始。
 * +100 及以上：表示超买状态或强烈上涨趋势的开始。
 * 接近 0 的值通常表明缺乏明确动能。
 *
 * 注意：交易者常将 CCI 与其他指标结合使用以确认趋势或信号，单独使用可能产生假信号。
 * 该指标在波动剧烈的市场或识别短期交易机会时尤为有用。
 *
 * @see https://en.wikipedia.org/wiki/Commodity_channel_index
 */
export class CCI extends IndicatorSeries<HighLowClose<number>> {
  private readonly sma: SMA;
  private readonly typicalPrices: number[];

  constructor(public readonly interval: number) {
    super();
    this.sma = new SMA(this.interval);
    this.typicalPrices = [];
  }

  override getRequiredInputs() {
    return this.sma.getRequiredInputs();
  }

  update(candle: HighLowClose<number>, replace: boolean) {
    const typicalPrice = this.cacheTypicalPrice(candle, replace);
    this.sma.update(typicalPrice, replace);

    if (this.sma.isStable) {
      const mean = this.sma.getResultOrThrow();
      const meanDeviation = MAD.getResultFromBatch(this.typicalPrices, mean);
      const numerator = typicalPrice - mean;
      const denominator = 0.015 * meanDeviation;
      return this.setResult(numerator / denominator, replace);
    }

    return null;
  }

  private cacheTypicalPrice({high, low, close}: HighLowClose<number>, replace: boolean) {
    const typicalPrice = (high + low + close) / 3;
    pushUpdate(this.typicalPrices, replace, typicalPrice, this.interval);
    return typicalPrice;
  }
}