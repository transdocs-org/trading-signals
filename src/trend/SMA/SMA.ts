import {MovingAverage} from '../MA/MovingAverage.js';
import {getAverage} from '../../util/getAverage.js';
import {pushUpdate} from '../../util/pushUpdate.js';

/**
 * 简单移动平均线（SMA）
 * 类型：趋势指标
 *
 * 简单移动平均线（SMA）在固定区间内对所有价格取平均值。SMA 对所有时期的价格赋予相同权重，因此不像 EMA 那样对最新价格敏感。
 *
 * @see https://www.investopedia.com/terms/s/sma.asp
 */
export class SMA extends MovingAverage {
  public readonly prices: number[] = [];

  override getRequiredInputs() {
    return this.interval;
  }

  update(price: number, replace: boolean) {
    pushUpdate(this.prices, replace, price, this.interval);

    if (this.prices.length === this.interval) {
      return this.setResult(getAverage(this.prices), replace);
    }

    return null;
  }
}