import {MovingAverage} from '../MA/MovingAverage.js';
import {pushUpdate} from '../../util/pushUpdate.js';

/**
 * 加权移动平均线（WMA）
 * 类型：趋势
 *
 * 与简单移动平均线（SMA）相比，WMA 更重视近期价格，以降低滞后性。由于其对价格变化的响应更快，当价格上涨或下跌时，WMA 比 SMA 上升得更快、下降得也更快。
 *
 * @see https://corporatefinanceinstitute.com/resources/career-map/sell-side/capital-markets/weighted-moving-average-wma/
 */
export class WMA extends MovingAverage {
  public readonly prices: number[] = [];

  constructor(public override readonly interval: number) {
    super(interval);
  }

  override getRequiredInputs() {
    return this.interval;
  }

  update(price: number, replace: boolean) {
    pushUpdate(this.prices, replace, price, this.interval);

    if (this.prices.length === this.interval) {
      const weightedPricesSum = this.prices.reduce((acc: number, price: number, index: number) => {
        const weightedPrice = price * (index + 1);

        return acc + weightedPrice;
      }, 0);

      const weightBase = (this.interval * (this.interval + 1)) / 2; // 分子始终为偶数，结果必为整数。
      const weightedMa = weightedPricesSum / weightBase;

      return this.setResult(weightedMa, replace);
    }

    return null;
  }
}