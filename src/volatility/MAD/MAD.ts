import {IndicatorSeries} from '../../types/Indicator.js';
import {getAverage, pushUpdate} from '../../util/index.js';

/**
 * 平均绝对偏差（MAD）
 * 类型：波动率
 *
 * 平均绝对偏差（MAD）计算在给定周期内与均值的绝对偏差/差值。较大的异常值会导致更高的 MAD。
 *
 * @see https://en.wikipedia.org/wiki/Average_absolute_deviation
 */
export class MAD extends IndicatorSeries {
  public readonly prices: number[] = [];

  constructor(public readonly interval: number) {
    super();
  }

  override getRequiredInputs() {
    return this.interval;
  }

  update(price: number, replace: boolean) {
    pushUpdate(this.prices, replace, price, this.interval);

    if (this.prices.length === this.interval) {
      const mean = getAverage(this.prices);
      let sum = 0;
      for (let i = 0; i < this.interval; i++) {
        const deviation = Math.abs(this.prices[i] - mean);
        sum += deviation;
      }
      return this.setResult(sum / this.interval, replace);
    }

    return null;
  }

  static getResultFromBatch(prices: number[], average?: number): number {
    if (prices.length === 0) {
      return 0;
    }
    const mean = average || getAverage(prices);
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
      const deviation = Math.abs(prices[i] - mean);
      sum += deviation;
    }
    return sum / prices.length;
  }
}