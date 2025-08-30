import type {DEMA} from '../../trend/DEMA/DEMA.js';
import type {EMA} from '../../trend/EMA/EMA.js';
import {TechnicalIndicator} from '../../types/Indicator.js';
import {pushUpdate} from '../../util/pushUpdate.js';

export type MACDResult = {
  histogram: number;
  macd: number;
  signal: number;
};

/**
 * 移动平均收敛/发散指标 (MACD)
 * 类型：动量指标
 *
 * 当 MACD 向上穿越其信号线时，触发看涨买入信号；向下穿越时，触发看跌卖出信号。
 * MACD 可与 RSI 结合使用，以提供更准确的交易信号。
 *
 * @see https://www.investopedia.com/terms/m/macd.asp
 */
export class MACD extends TechnicalIndicator<MACDResult, number> {
  public readonly prices: number[] = [];

  constructor(
    public readonly short: EMA | DEMA,
    public readonly long: EMA | DEMA,
    public readonly signal: EMA | DEMA
  ) {
    super();
  }

  override getRequiredInputs() {
    return this.long.getRequiredInputs();
  }

  update(price: number, replace: boolean) {
    pushUpdate(this.prices, replace, price, this.long.interval);

    const short = this.short.update(price, replace);
    const long = this.long.update(price, replace);

    if (this.prices.length === this.long.interval) {
      const macd = short - long;
      const signal = this.signal.update(macd, replace);

      return (this.result = {
        histogram: macd - signal,
        macd,
        signal,
      });
    }
    return null;
  }
}