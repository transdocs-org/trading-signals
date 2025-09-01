import {MovingAverage} from '../MA/MovingAverage.js';
import {pushUpdate} from '../../util/pushUpdate.js';

/**
 * Spencer 15 点移动平均
 * 类型：趋势
 *
 * 一种使用 15 个数据点并配以预设权重的加权移动平均，专为最优数据平滑而设计。
 * 它是特定的加权移动平均，旨在保留数据中的趋势成分，同时最大限度地减少季节性或不规则波动带来的失真。
 *
 * 公式使用以下特定权重：
 * [-3, -6, -5, 3, 21, 46, 67, 74, 67, 46, 21, 3, -5, -6, -3]
 *
 * @see https://www.stat.berkeley.edu/~aditya/Site/Statistics_153;_Spring_2012_files/Spring2012Statistics153LectureThree.pdf
 * @see https://mathworld.wolfram.com/Spencers15-PointMovingAverage.html
 */
export class SMA15 extends MovingAverage {
  public readonly prices: number[] = [];
  private static readonly WEIGHTS = [-3, -6, -5, 3, 21, 46, 67, 74, 67, 46, 21, 3, -5, -6, -3];
  private static readonly WEIGHT_SUM = 320;

  override getRequiredInputs() {
    return SMA15.WEIGHTS.length;
  }

  update(price: number, replace: boolean) {
    pushUpdate(this.prices, replace, price, this.getRequiredInputs());

    if (this.prices.length === this.getRequiredInputs()) {
      let weightedPricesSum = 0;

      for (let i = 0; i < this.getRequiredInputs(); i++) {
        const weightedPrice = this.prices[i] * SMA15.WEIGHTS[i];
        weightedPricesSum += weightedPrice;
      }

      const weightedAverage = weightedPricesSum / SMA15.WEIGHT_SUM;
      return this.setResult(weightedAverage, replace);
    }

    return null;
  }
}